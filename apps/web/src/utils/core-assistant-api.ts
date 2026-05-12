export type CoreAssistantPersonality = {
	id: string;
	slug: string;
	displayName: string;
	description: string | null;
	domain: string | null;
	isDefault: boolean;
};

export type CoreAssistantTone = {
	id: string;
	slug: string;
	displayName: string;
	description: string | null;
	isDefault: boolean;
};

export type CoreUpdateAssistantConfigInput = {
	assistantName?: string;
	activePersonalityId?: string;
	activeToneId?: string;
};

function getCoreBaseUrl(): string {
	return (
		process.env.NEXT_PUBLIC_CORE_URL ?? 'http://localhost:3001'
	).replace(/\/$/, '');
}

async function fetchWithTimeout(
	input: string,
	init?: RequestInit,
	timeoutMs = 4500,
): Promise<Response> {
	const controller = new AbortController();
	const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

	try {
		return await fetch(input, {
			...init,
			signal: controller.signal,
		});
	} finally {
		window.clearTimeout(timeoutId);
	}
}

async function parseJson<T>(response: Response): Promise<T> {
	return (await response.json()) as T;
}

export async function getCoreAssistantPersonalities(
	locale?: string,
): Promise<CoreAssistantPersonality[]> {
	const url = new URL(`${getCoreBaseUrl()}/assistant/personalities`);
	if (locale) {
		url.searchParams.set('locale', locale);
	}
	const response = await fetchWithTimeout(url.toString(), {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(
			`No se pudo obtener los tipos de comportamiento (${response.status})`,
		);
	}

	const payload =
		await parseJson<Partial<CoreAssistantPersonality>[]>(response);

	return payload
		.filter(
			(
				item,
			): item is Partial<CoreAssistantPersonality> & { id: string } =>
				typeof item.id === 'string',
		)
		.map((item) => ({
			id: item.id,
			slug: typeof item.slug === 'string' ? item.slug : '',
			displayName:
				typeof item.displayName === 'string'
					? item.displayName
					: 'Sin nombre',
			description:
				typeof item.description === 'string' ? item.description : null,
			domain: typeof item.domain === 'string' ? item.domain : null,
			isDefault: item.isDefault === true,
		}));
}

export async function getCoreAssistantTones(
	locale?: string,
): Promise<CoreAssistantTone[]> {
	const url = new URL(`${getCoreBaseUrl()}/assistant/tones`);
	if (locale) {
		url.searchParams.set('locale', locale);
	}
	const response = await fetchWithTimeout(url.toString(), {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(
			`No se pudo obtener los tonos de comunicación (${response.status})`,
		);
	}

	const payload = await parseJson<Partial<CoreAssistantTone>[]>(response);

	return payload
		.filter(
			(item): item is Partial<CoreAssistantTone> & { id: string } =>
				typeof item.id === 'string',
		)
		.map((item) => ({
			id: item.id,
			slug: typeof item.slug === 'string' ? item.slug : '',
			displayName:
				typeof item.displayName === 'string'
					? item.displayName
					: 'Sin nombre',
			description:
				typeof item.description === 'string' ? item.description : null,
			isDefault: item.isDefault === true,
		}));
}

export async function updateCoreAssistantConfig(
	input: CoreUpdateAssistantConfigInput,
): Promise<void> {
	const response = await fetchWithTimeout(
		`${getCoreBaseUrl()}/assistant/config`,
		{
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(input),
		},
	);

	if (!response.ok) {
		throw new Error(
			`No se pudo actualizar la configuración del asistente (${response.status})`,
		);
	}
}
