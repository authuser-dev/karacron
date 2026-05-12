// Paquete config: lee las variables de entorno y devuelve una struct tipada.
// Equivalente al AppConfigService de NestJS â€” un Ãºnico lugar donde vive la config.
package config

import "os"

// Config contiene toda la configuraciÃ³n de la aplicaciÃ³n.
type Config struct {
	Port              string
	Env               string
	LogLevel          string // debug, info, warn, error
	DatabasePath      string
	WorkerConcurrency string
	DefaultProvider   string
	FallbackProvider  string
	CorsOrigins       string
	RateLimitMax      string
	RateLimitWindow   string
}

// Load lee las variables de entorno y devuelve la Config.
func Load() *Config {
	return &Config{
		Port:              getEnv("PORT", "3000"),
		Env:               getEnv("APP_ENV", "development"),
		LogLevel:          getEnv("LOG_LEVEL", "info"),
		DatabasePath:      getEnv("DATABASE_PATH", "data/kara.db"),
		WorkerConcurrency: getEnv("WORKER_CONCURRENCY", "4"),
		DefaultProvider:   getEnv("DEFAULT_PROVIDER", "local"),
		FallbackProvider:  getEnv("FALLBACK_PROVIDER", "openrouter"),
		CorsOrigins:       getEnv("CORS_ORIGINS", "http://localhost:3000,http://localhost:4000"),
		RateLimitMax:      getEnv("RATE_LIMIT_MAX", "100"),
		RateLimitWindow:   getEnv("RATE_LIMIT_WINDOW", "60"),
	}
}

// getEnv es un helper privado (minÃºscula = no exportado fuera del paquete).
// Si la variable de entorno 'key' existe y no estÃ¡ vacÃ­a la devuelve,
// si no, devuelve el 'fallback'. Equivalente al patrÃ³n process.env.X ?? 'default'.
func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

