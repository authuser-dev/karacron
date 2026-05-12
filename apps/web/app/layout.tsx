import { ClientProviders } from '@/src/providers/client-providers';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
	variable: '--font-inter',
	display: 'swap',
	subsets: ['latin'],
});

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
	return (
		<html
			lang="es"
			suppressHydrationWarning
			className={`${inter.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
				<ClientProviders initialLocale="es">{children}</ClientProviders>
			</body>
		</html>
	);
}
