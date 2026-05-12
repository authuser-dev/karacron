'use client';

import { Moon01, Sun } from '@untitledui/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from 'react-aria-components';
import { useTranslation } from 'react-i18next';

export function ThemeToggle({ showLabel = true }: { showLabel?: boolean }) {
	const { resolvedTheme, setTheme } = useTheme();
	const { t } = useTranslation();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && resolvedTheme === 'dark';
	const effectiveTheme = mounted ? resolvedTheme : 'light';

	return (
		<Button
			onPress={() =>
				setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')
			}
			aria-label={t('toggleTheme')}
			className={`inline-flex items-center justify-center rounded-lg border border-neutral-700 text-sm font-medium hover:border-neutral-500 ${showLabel ? 'gap-2 px-3 py-2' : 'size-8 p-0'}`}
		>
			{isDark ? (
				<Sun className="size-4" />
			) : (
				<Moon01 className="size-4" />
			)}
			{showLabel && t('toggleTheme')}
		</Button>
	);
}
