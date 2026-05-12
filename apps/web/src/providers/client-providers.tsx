'use client';

import { HttpProvider } from '@authuser/http-react';
import type { Locale } from '@i18n/config';
import { LocaleProvider, useI18n } from '@provider/locale-provider';
import { ThemeProvider } from '@provider/theme-provider';
import { WebSocketProvider } from '@provider/websocket-provider';
import type { ReactNode } from 'react';
import { I18nProvider } from 'react-aria';
import { http } from '../utils/http';

/**
 * Inner wrapper that reads the resolved locale from LocaleProvider and feeds it
 * into react-aria's I18nProvider so all react-aria components (calendars,
 * date formatters, etc.) use the same locale as the rest of the app.
 */
function ReactAriaLocaleSync({ children }: { children: ReactNode }) {
	const { locale } = useI18n();
	return <I18nProvider locale={locale}>{children}</I18nProvider>;
}

export function ClientProviders({
	children,
	initialLocale,
}: {
	children: ReactNode;
	initialLocale: Locale;
}) {
	return (
		<ThemeProvider>
			<LocaleProvider initialLocale={initialLocale}>
				<HttpProvider service={http}>
					<ReactAriaLocaleSync>
						<WebSocketProvider>{children}</WebSocketProvider>
					</ReactAriaLocaleSync>
				</HttpProvider>
			</LocaleProvider>
		</ThemeProvider>
	);
}
