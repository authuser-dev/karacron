import type { Metadata, Viewport } from 'next';

import { Fragment } from 'react/jsx-runtime';

export const metadata: Metadata = {
	title: 'Kara Web',
	description: 'Frontend Next.js conectada con Kara Core',
};

export const viewport: Viewport = {
	colorScheme: 'light',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Fragment>{children}</Fragment>;
}
