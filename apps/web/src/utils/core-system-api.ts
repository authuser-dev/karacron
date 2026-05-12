export type CoreSystemDisk = {
	id: string;
	label: string;
	path: string;
	writable: boolean;
	totalBytes: number;
	freeBytes: number;
};

type CoreSystemStorageResponse = {
	timestamp: string;
	disks: CoreSystemDisk[];
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

export async function getCoreSystemDisks(): Promise<CoreSystemDisk[]> {
	const response = await fetchWithTimeout(
		`${getCoreBaseUrl()}/system/storage`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
			cache: 'no-store',
		},
	);

	if (!response.ok) {
		throw new Error(
			`No se pudo obtener los discos del sistema (${response.status})`,
		);
	}

	const payload =
		await parseJson<Partial<CoreSystemStorageResponse>>(response);

	if (!Array.isArray(payload.disks)) {
		return [];
	}

	return payload.disks
		.filter((item) => typeof item.id === 'string')
		.map((item) => ({
			id: item.id,
			label: typeof item.label === 'string' ? item.label : 'Disk',
			path: typeof item.path === 'string' ? item.path : '',
			writable: item.writable === true,
			totalBytes:
				typeof item.totalBytes === 'number' ? item.totalBytes : 0,
			freeBytes: typeof item.freeBytes === 'number' ? item.freeBytes : 0,
		}));
}
