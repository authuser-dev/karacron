'use client';

import { supportedLocales, type Locale } from '@/src/i18n/config';
import { useI18n } from '@/src/providers/locale-provider';
import { Select } from '@base/select/select';
import type { Key } from 'react';

export function LanguageSwitcher({
	showLabel = true,
}: {
	showLabel?: boolean;
}) {
	const { locale, setLocale, messages } = useI18n();
	const currentLanguage = supportedLocales.includes(locale) ? locale : 'en';
	const options = supportedLocales.map((language) => ({
		id: language,
		label: messages.common.localeNames[language],
	}));

	return (
		<Select
			label={showLabel ? messages.common.languageLabel : undefined}
			size={showLabel ? 'md' : 'sm'}
			selectedKey={currentLanguage}
			onSelectionChange={(key) => {
				setLocale(String(key as Key) as Locale);
			}}
			items={options}
			className={showLabel ? 'w-max' : 'w-30'}
		>
			{(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
		</Select>
	);
}
