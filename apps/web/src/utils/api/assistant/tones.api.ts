import { http } from '@util/http';

type AssistantToneDto = {
	id: string;
	slug: string;
	displayName: string;
	description: string | null;
	isDefault: boolean;
};

export async function getTones(locale: string) {
	const data = await http.request<AssistantToneDto[]>({
		method: 'GET',
		url: '/assistant/tones',
		headers: {
			'X-Locale': locale,
			'Accept-Language': locale,
		},
	});

	console.log('Tones fetched from API:', data);

	return data;
}
