'use client';

import { useWebSocket } from '@/src/providers/websocket-provider';
import { useEffect, useState } from 'react';

export type ConnectionState = 'connecting' | 'connected' | 'error';

export type ConnectionStatus = {
	http: ConnectionState;
	ws: ConnectionState;
	combined: ConnectionState;
};

function getCoreBaseUrl(): string {
	return (
		process.env.NEXT_PUBLIC_CORE_URL ?? 'http://localhost:3001'
	).replace(/\/$/, '');
}

function combinedState(
	http: ConnectionState,
	ws: ConnectionState,
): ConnectionState {
	if (http === 'connected' && ws === 'connected') return 'connected';
	if (http === 'error' || ws === 'error') return 'error';
	return 'connecting';
}

export function useConnectionStatus(pollIntervalMs = 5000): ConnectionStatus {
	const [http, setHttp] = useState<ConnectionState>('connecting');
	const { readyState } = useWebSocket();

	const ws: ConnectionState =
		readyState === 'connected'
			? 'connected'
			: readyState === 'error' || readyState === 'disconnected'
				? 'error'
				: 'connecting';

	// HTTP health poll
	useEffect(() => {
		let cancelled = false;

		async function checkHttp() {
			try {
				const controller = new AbortController();
				const id = window.setTimeout(() => controller.abort(), 4000);
				const res = await fetch(`${getCoreBaseUrl()}/health`, {
					method: 'GET',
					signal: controller.signal,
					cache: 'no-store',
				});
				window.clearTimeout(id);

				if (!cancelled) {
					setHttp(res.ok ? 'connected' : 'error');
				}
			} catch {
				if (!cancelled) {
					setHttp('error');
				}
			}
		}

		void checkHttp();
		const id = window.setInterval(() => void checkHttp(), pollIntervalMs);

		return () => {
			cancelled = true;
			window.clearInterval(id);
		};
	}, [pollIntervalMs]);

	return { http, ws, combined: combinedState(http, ws) };
}
