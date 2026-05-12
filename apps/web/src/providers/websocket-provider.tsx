'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from 'react';

export type WsReadyState =
	| 'connecting'
	| 'connected'
	| 'disconnected'
	| 'error';

type WebSocketContextValue = {
	socket: WebSocket | null;
	readyState: WsReadyState;
	emit: <T>(event: string, payload?: T) => void;
};

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

function getServicesWsUrl(): string {
	const base =
		process.env.NEXT_PUBLIC_SERVICES_WS_URL ?? 'ws://localhost:3001';
	return base.replace(/\/$/, '') + '/ws';
}

export function WebSocketProvider({ children }: { children: ReactNode }) {
	const [readyState, setReadyState] = useState<WsReadyState>('connecting');
	const socketRef = useRef<WebSocket | null>(null);

	const connect = useCallback(() => {
		const ws = new WebSocket(getServicesWsUrl());
		socketRef.current = ws;

		ws.addEventListener('open', () => setReadyState('connected'));
		ws.addEventListener('close', () => {
			setReadyState('disconnected');
			// Reconexión automática con backoff fijo (1 s)
			setTimeout(connect, 1000);
		});
		ws.addEventListener('error', () => setReadyState('error'));
	}, []);

	useEffect(() => {
		connect();
		return () => {
			// Evitar la reconexión al desmontar
			const ws = socketRef.current;
			if (ws) {
				ws.onclose = null;
				ws.close();
				socketRef.current = null;
			}
		};
	}, [connect]);

	function emit<T>(event: string, payload?: T) {
		const ws = socketRef.current;
		if (!ws || ws.readyState !== WebSocket.OPEN) return;
		ws.send(JSON.stringify({ event, data: payload }));
	}

	return (
		<WebSocketContext.Provider
			value={{ socket: socketRef.current, readyState, emit }}
		>
			{children}
		</WebSocketContext.Provider>
	);
}

export function useWebSocket(): WebSocketContextValue {
	const ctx = useContext(WebSocketContext);

	if (!ctx) {
		throw new Error('useWebSocket debe usarse dentro de WebSocketProvider');
	}

	return ctx;
}
