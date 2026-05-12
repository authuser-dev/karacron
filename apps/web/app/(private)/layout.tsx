import { Menu } from '@/src/components/foundations/menu/menu';
import { PrivateRouteGate } from '@/src/components/guards/private-route-gate';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
	title: 'Kara Web',
	description: 'Frontend Next.js conectada con Kara Core',
};

export const viewport: Viewport = {
	colorScheme: 'light',
};

export default function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<PrivateRouteGate>
			<div className="flex min-h-screen bg-neutral-950 text-neutral-100">
				<aside className="w-72 shrink-0 border-r border-white/10 bg-neutral-900/80 backdrop-blur lg:w-80">
					<Menu />
				</aside>
				<main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
					<div className="min-h-screen w-full px-6 py-6 lg:px-10 lg:py-8">
						{children}
					</div>
				</main>
			</div>
		</PrivateRouteGate>
	);
}
