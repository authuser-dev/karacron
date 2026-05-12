package websocket

import (
	"github.com/authuser-dev/karacron/apps/core/src/util/log"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/fasthttp/websocket"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

const chatChunkSize = 240

var upgrader = websocket.FastHTTPUpgrader{
	CheckOrigin: func(ctx *fasthttp.RequestCtx) bool {
		return true
	},
}

// wsIncoming es el sobre de todos los mensajes entrantes: {"event":"...", "data": <cualquier JSON>}
type wsIncoming struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

// wsChatRequest corresponde al evento "chat": {"message":"...", "context":{...}}
type wsChatRequest struct {
	Message string                 `json:"message"`
	Context map[string]interface{} `json:"context,omitempty"`
}

// send escribe un mensaje JSON en la conexiÃ³n de forma segura.
func send(conn *websocket.Conn, log *zap.Logger, clientID string, payload any) {
	b, err := json.Marshal(payload)
	if err != nil {
		log.Error("ws: error serializando mensaje", zap.String("clientID", clientID), zap.Error(err))
		return
	}
	if err := conn.WriteMessage(websocket.TextMessage, b); err != nil {
		log.Warn("ws: error escribiendo mensaje", zap.String("clientID", clientID), zap.Error(err))
	}
}

// handleMessage procesa el evento "message": eco al emisor + broadcast al resto.
func handleMessage(conn *websocket.Conn, hub *Hub, log *zap.Logger, clientID string, raw json.RawMessage) {
	send(conn, log, clientID, map[string]interface{}{
		"event": "message",
		"data":  raw,
	})

	broadcast, _ := json.Marshal(map[string]interface{}{
		"event": "message",
		"from":  clientID,
		"data":  raw,
	})
	hub.Broadcast(clientID, broadcast)
}

// chunkString divide una cadena en trozos de tamaÃ±o fijo (igual que NestJS WebsocketService).
func chunkString(s string, size int) []string {
	if s == "" {
		return []string{""}
	}
	var chunks []string
	runes := []rune(s)
	for start := 0; start < len(runes); start += size {
		end := start + size
		if end > len(runes) {
			end = len(runes)
		}
		chunks = append(chunks, string(runes[start:end]))
	}
	return chunks
}

// buildMarkdownResponse replica la lÃ³gica de WebsocketService.buildMarkdownResponse.
func buildMarkdownResponse(req wsChatRequest) string {
	msg := strings.TrimSpace(req.Message)
	if msg == "" {
		msg = "Sin contenido"
	}
	contextSection := ""
	if req.Context != nil {
		b, _ := json.MarshalIndent(req.Context, "", "  ")
		contextSection = fmt.Sprintf("\n\n## Contexto\n\n```json\n%s\n```", string(b))
	}
	return fmt.Sprintf("# Respuesta de chat\n\n## Mensaje recibido\n\n%s%s", msg, contextSection)
}

// handleChat procesa el evento "chat": emite chunks de markdown + chat:done, devuelve chat:accepted.
// Replica exactamente la lÃ³gica de WebsocketGateway.handleChat + WebsocketService.handleChat.
func handleChat(conn *websocket.Conn, log *zap.Logger, clientID string, raw json.RawMessage) {
	var req wsChatRequest
	if err := json.Unmarshal(raw, &req); err != nil {
		send(conn, log, clientID, map[string]interface{}{
			"event":   "error",
			"message": "payload invÃ¡lido para chat",
		})
		return
	}

	log.Debug("ws: chat request", zap.String("clientID", clientID), zap.String("message", req.Message))

	markdown := buildMarkdownResponse(req)
	chunks := chunkString(markdown, chatChunkSize)

	for i, chunk := range chunks {
		send(conn, log, clientID, map[string]interface{}{
			"event": "chat:chunk",
			"data": map[string]interface{}{
				"content": chunk,
				"index":   i,
				"total":   len(chunks),
			},
		})
	}

	send(conn, log, clientID, map[string]interface{}{
		"event": "chat:done",
		"data": map[string]interface{}{
			"total":  len(chunks),
			"format": "markdown",
		},
	})

	// chat:accepted â€” respuesta final equivalente al return del gateway NestJS
	send(conn, log, clientID, map[string]interface{}{
		"event": "chat:accepted",
		"data": map[string]interface{}{
			"total":  len(chunks),
			"format": "markdown",
		},
	})
}

// RegisterRoutes aÃ±ade la ruta WebSocket /ws a la app de Fiber.
func Register(app *fiber.App, hub *Hub) {
	log := log.Log("ws")
	app.Get("/ws", func(c fiber.Ctx) error {
		return upgrader.Upgrade(c.RequestCtx(), func(conn *websocket.Conn) {
			clientID := uuid.New().String()

			client := &Client{ID: clientID, Conn: conn}
			hub.Register(client)
			defer hub.Unregister(clientID)

			log.Info("ws: conexiÃ³n establecida",
				zap.String("clientID", clientID),
				zap.String("remoteAddr", conn.RemoteAddr().String()),
			)

			// Bienvenida
			send(conn, log, clientID, map[string]interface{}{
				"event":    "connected",
				"clientId": clientID,
			})

			// Bucle de lectura de mensajes
			for {
				_, msg, err := conn.ReadMessage()
				if err != nil {
					if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) {
						log.Info("ws: cliente cerrÃ³ la conexiÃ³n", zap.String("clientID", clientID))
					} else {
						log.Warn("ws: conexiÃ³n cerrada inesperadamente",
							zap.String("clientID", clientID), zap.Error(err))
					}
					return
				}

				log.Debug("ws: mensaje recibido",
					zap.String("clientID", clientID), zap.String("msg", string(msg)))

				var incoming wsIncoming
				if err := json.Unmarshal(msg, &incoming); err != nil {
					send(conn, log, clientID, map[string]interface{}{
						"event":   "error",
						"message": "JSON invÃ¡lido",
					})
					continue
				}

				switch incoming.Event {
				case "message":
					handleMessage(conn, hub, log, clientID, incoming.Data)
				case "chat":
					handleChat(conn, log, clientID, incoming.Data)
				default:
					send(conn, log, clientID, map[string]interface{}{
						"event":   "error",
						"message": fmt.Sprintf("evento desconocido: %s", incoming.Event),
					})
				}
			}
		})
	})

	log.Info("ws: ruta /ws registrada")
}



