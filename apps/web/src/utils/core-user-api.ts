export type CoreUserStatus = {
	userExists: boolean;
	onboardingCompleted: boolean;
	userId: string | null;
	requiresOtp: boolean;
};

export type CoreCreateUserInput = {
	name: string;
	lastName: string;
	email: string;
	birthDate?: string;
	description?: string;
	locale?: string;
	timezone?: string;
	onboardingCompleted?: boolean;
	preferences?: Record<string, unknown>;
};

export type CoreUpdateUserInput = Partial<CoreCreateUserInput>;

export type CoreCurrentUser = {
	id: string;
	name: string;
	lastName: string | null;
	email: string | null;
	locale: string;
	timezone: string;
	onboardingCompleted: boolean;
};

function getCoreBaseUrl(): string {
	return (
		process.env.NEXT_PUBLIC_CORE_URL ?? "http://localhost:3001"
	).replace(/\/$/, "");
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

export async function getCoreUserStatus(): Promise<CoreUserStatus> {
	const response = await fetchWithTimeout(`${getCoreBaseUrl()}/user/status`, {
		method: "GET",
		headers: {
			"content-type": "application/json",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(
			`No se pudo consultar el estado del usuario (${response.status})`,
		);
	}

	const payload = await parseJson<Partial<CoreUserStatus>>(response);

	return {
		userExists: payload.userExists === true,
		onboardingCompleted: payload.onboardingCompleted === true,
		userId: typeof payload.userId === "string" ? payload.userId : null,
		requiresOtp: payload.requiresOtp === true,
	};
}

export async function createCoreUser(
	input: CoreCreateUserInput,
): Promise<void> {
	const response = await fetchWithTimeout(`${getCoreBaseUrl()}/user`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(input),
	});

	if (!response.ok) {
		const error = new Error(
			`No se pudo crear el usuario (${response.status})`,
		);
		(error as any).status = response.status;
		throw error;
	}
}

export async function getCurrentCoreUser(): Promise<CoreCurrentUser> {
	const response = await fetchWithTimeout(`${getCoreBaseUrl()}/user/me`, {
		method: "GET",
		headers: {
			"content-type": "application/json",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(
			`No se pudo obtener el usuario actual (${response.status})`,
		);
	}

	return parseJson<CoreCurrentUser>(response);
}

export async function updateCurrentCoreUser(
	input: CoreUpdateUserInput,
): Promise<void> {
	const response = await fetchWithTimeout(`${getCoreBaseUrl()}/user/me`, {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(input),
	});

	if (!response.ok) {
		throw new Error(
			`No se pudo actualizar el usuario (${response.status})`,
		);
	}
}

export type EmailValidationResult = {
	valid: boolean;
	reason?: "invalid_format" | "no_mx_record" | "dns_error";
};

export async function validateCoreEmail(
	email: string,
): Promise<EmailValidationResult> {
	const params = new URLSearchParams({ email });
	const response = await fetchWithTimeout(
		`${getCoreBaseUrl()}/user/validate-email?${params.toString()}`,
		{ method: "GET", headers: { "content-type": "application/json" } },
	);

	if (!response.ok) {
		return { valid: false, reason: "dns_error" };
	}

	return parseJson<EmailValidationResult>(response);
}
