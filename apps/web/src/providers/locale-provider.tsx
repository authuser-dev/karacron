'use client';

import { getCurrentCoreUser } from '@/src/utils/core-user-api';
import {
	DEFAULT_LOCALE,
	getLocaleMessages,
	getPreferredLocale,
	LOCALE_COOKIE_NAME,
	LOCALE_STORAGE_KEY,
	resolveLocale,
	supportedLocales,
	type Locale,
} from '@i18n/config';
import {
	createContext,
	startTransition,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

type LocaleContextValue = {
	locale: Locale;
	messages: ReturnType<typeof getLocaleMessages>;
	setLocale: (locale: Locale) => void;
	locales: readonly Locale[];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function persistLocale(locale: Locale) {
	window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
	document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
	document.documentElement.lang = locale;
}

function readStoredLocale() {
	const storedLocale = resolveLocale(
		window.localStorage.getItem(LOCALE_STORAGE_KEY),
	);

	if (storedLocale) {
		return storedLocale;
	}

	const cookieValue = document.cookie
		.split(';')
		.map((part) => part.trim())
		.find((part) => part.startsWith(`${LOCALE_COOKIE_NAME}=`))
		?.split('=')[1];

	return resolveLocale(cookieValue);
}

function detectBrowserLocale() {
	if (typeof navigator === 'undefined') {
		return DEFAULT_LOCALE;
	}

	const languageCandidates = [
		...(navigator.languages ?? []),
		navigator.language,
	]
		.filter(Boolean)
		.join(',');

	return getPreferredLocale(languageCandidates);
}

export function LocaleProvider({
	children,
	initialLocale,
}: {
	children: ReactNode;
	initialLocale: Locale;
}) {
	const [locale, setLocaleState] = useState<Locale>(initialLocale);

	useEffect(() => {
		const storedLocale = readStoredLocale();

		if (storedLocale) {
			persistLocale(storedLocale);

			if (storedLocale !== locale) {
				startTransition(() => setLocaleState(storedLocale));
			}

			return;
		}

		// No stored locale — try to get it from the Core API, then fall back to browser detection
		getCurrentCoreUser()
			.then((user) => resolveLocale(user.locale) ?? detectBrowserLocale())
			.catch(() => detectBrowserLocale())
			.then((detectedLocale) => {
				persistLocale(detectedLocale);

				if (detectedLocale !== locale) {
					startTransition(() => setLocaleState(detectedLocale));
				}
			});
	}, [locale]);

	function setLocale(nextLocale: Locale) {
		persistLocale(nextLocale);

		startTransition(() => {
			setLocaleState(nextLocale);
		});
	}

	return (
		<LocaleContext.Provider
			value={{
				locale,
				messages: getLocaleMessages(locale),
				setLocale,
				locales: supportedLocales,
			}}
		>
			{children}
		</LocaleContext.Provider>
	);
}

export function useI18n() {
	const context = useContext(LocaleContext);

	if (!context) {
		throw new Error('useI18n debe usarse dentro de LocaleProvider');
	}

	return context;
}
