import deMessages from './locale/de.json';
import enMessages from './locale/en.json';
import esMessages from './locale/es.json';
import frMessages from './locale/fr.json';
import hiMessages from './locale/hi.json';
import itMessages from './locale/it.json';
import jaMessages from './locale/ja.json';
import ptMessages from './locale/pt.json';
import ruMessages from './locale/ru.json';
import zhMessages from './locale/zh.json';

export const supportedLocales = [
	'es',
	'en',
	'ru',
	'zh',
	'ja',
	'hi',
	'fr',
	'it',
	'de',
	'pt',
] as const;

export type Locale = (typeof supportedLocales)[number];
type LocaleMessages = typeof enMessages;

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE_NAME = 'kara-locale';
export const LOCALE_STORAGE_KEY = 'kara-locale';

const messages = {
	es: esMessages,
	en: enMessages,
	ru: ruMessages,
	zh: zhMessages,
	ja: jaMessages,
	hi: hiMessages,
	fr: frMessages,
	it: itMessages,
	de: deMessages,
	pt: ptMessages,
} satisfies Record<Locale, LocaleMessages>;

export function resolveLocale(value: string | null | undefined): Locale | null {
	if (!value) {
		return null;
	}

	const normalizedValue = value.trim().toLowerCase().split('-')[0];

	return (
		supportedLocales.find((locale) => locale === normalizedValue) ?? null
	);
}

export function getPreferredLocale(
	acceptLanguageHeader: string | null | undefined,
) {
	if (!acceptLanguageHeader) {
		return DEFAULT_LOCALE;
	}

	for (const candidate of acceptLanguageHeader.split(',')) {
		const locale = resolveLocale(candidate.split(';')[0]);

		if (locale) {
			return locale;
		}
	}

	return DEFAULT_LOCALE;
}

export function getLocaleMessages(locale: Locale) {
	return messages[locale];
}
