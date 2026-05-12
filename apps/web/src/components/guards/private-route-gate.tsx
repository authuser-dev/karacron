'use client';

import { getCoreUserStatus } from '@util/core-user-api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type PrivateRouteGateProps = {
	children: React.ReactNode;
};

export function PrivateRouteGate({ children }: PrivateRouteGateProps) {
	const router = useRouter();
	const [isAllowed, setIsAllowed] = useState(false);

	useEffect(() => {
		let cancelled = false;

		void (async () => {
			try {
				const status = await getCoreUserStatus();

				if (cancelled) {
					return;
				}

				if (!status.userExists || !status.onboardingCompleted) {
					router.replace('/onboarding');
					return;
				}

				setIsAllowed(true);
			} catch {
				if (!cancelled) {
					router.replace('/onboarding');
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [router]);

	if (!isAllowed) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-100">
				Validando acceso...
			</main>
		);
	}

	return <>{children}</>;
}
