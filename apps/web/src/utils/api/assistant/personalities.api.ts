import { http } from '@util/http';

type AssistantPersonalityDto = {
	id: string;
	slug: string;
	displayName: string;
	description: string | null;
	domain: string | null;
	isDefault: boolean;
};

export async function getPersonalities(locale: string) {
	const data = await http.request<AssistantPersonalityDto[]>({
		method: 'GET',
		url: '/assistant/personalities',
		headers: {
			'X-Locale': locale,
			'Accept-Language': locale,
		},
	});

	return data;
}
