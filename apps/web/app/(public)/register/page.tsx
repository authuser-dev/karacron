'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Register() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/onboarding');
	}, [router]);

	return (
		<main className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-100">
			Redirigiendo al onboarding...
		</main>
	);
}
