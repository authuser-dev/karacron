'use client';

import {
	type ConnectionState,
	type ConnectionStatus,
} from '@/src/hooks/use-connection-status';

const STATE_STYLES: Record<
	ConnectionState,
	{ dot: string; text: string; label: string }
> = {
	connecting: {
		dot: 'bg-orange-400 animate-pulse',
		text: 'text-orange-400',
		label: 'Conectando',
	},
	connected: {
		dot: 'bg-emerald-400',
		text: 'text-emerald-400',
		label: 'Conectado',
	},
	error: {
		dot: 'bg-red-500',
		text: 'text-red-500',
		label: 'Sin conexión',
	},
};

type ConnectionBadgeProps = {
	status: ConnectionStatus;
};

export function ConnectionBadge({ status }: ConnectionBadgeProps) {
	const { http, ws, combined } = status;
	const style = STATE_STYLES[combined];

	const title = `HTTP: ${STATE_STYLES[http].label} · WS: ${STATE_STYLES[ws].label}`;

	return (
		<span
			title={title}
			aria-label={title}
			className={`inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 text-xs font-medium ${style.text}`}
		>
			<span
				className={`h-1.5 w-1.5 rounded-full shrink-0 ${style.dot}`}
				aria-hidden="true"
			/>
			{style.label}
		</span>
	);
}
