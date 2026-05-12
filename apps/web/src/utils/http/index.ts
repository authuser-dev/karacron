import { AxiosHttpClient, HttpService } from '@authuser/http-core';
import {
	LocalStorageCache,
	LocalStoragePersistence,
} from '@authuser/http-react';

// Prefijos opcionales para organizar localStorage
const APP_PREFIX = 'Kara'; // ← Tu identificador de app

export const http = new HttpService({
	client: new AxiosHttpClient(),
	//session: new LocalSessionManager(),
	cache: new LocalStorageCache(`${APP_PREFIX}-cache`), // caché temporal con TTL
	persistence: new LocalStoragePersistence(`${APP_PREFIX}-persist`), // persistencia permanente
	config: {
		baseUrl: process.env.NEXT_PUBLIC_CORE_URL ?? 'http://localhost:3001',
		cache: { enabled: true, ttlMs: 60_000 },
		retry: {
			enabled: true,
			maxAttempts: 1,
			delay: 500,
			backoff: 'exponential',
			skipOnEndpoint: ['/auth/login'],
			skipOnStatusCode: [401, 429],
		},
	},
});
