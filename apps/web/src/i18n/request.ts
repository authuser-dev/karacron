import {
	DEFAULT_LOCALE,
	getLocaleMessages,
	getPreferredLocale,
	LOCALE_COOKIE_NAME,
	resolveLocale,
} from '@i18n/config';
import { cookies, headers } from 'next/headers';

export async function getRequestLocale() {
	const cookieStore = await cookies();
	const cookieLocale = resolveLocale(
		cookieStore.get(LOCALE_COOKIE_NAME)?.value,
	);

	if (cookieLocale) {
		return cookieLocale;
	}

	const headerStore = await headers();

	return getPreferredLocale(
		headerStore.get('accept-language') ?? DEFAULT_LOCALE,
	);
}

export async function getRequestMessages() {
	const locale = await getRequestLocale();

	return {
		locale,
		messages: getLocaleMessages(locale),
	};
}
