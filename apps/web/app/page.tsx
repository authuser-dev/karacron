'use client';

import { AppViewTransition } from '@/src/components/app-view-transition';
import { ConnectionBadge } from '@/src/components/connection-badge';
import { Logo } from '@/src/components/logo';
import { useConnectionStatus } from '@/src/hooks/use-connection-status';
import { useI18n } from '@/src/providers/locale-provider';
import { getCoreUserStatus } from '@util/core-user-api';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const MIN_PRELOAD_MS = 5000;

const DEFAULT_LOADING_PHRASES = [
	'Booting system services...',
	'Establishing a secure connection...',
	'Preparing your preferences...',
	'Syncing your assistant...',
];

export default function Home() {
	const router = useRouter();
	const { messages, locale } = useI18n();
	const connectionStatus = useConnectionStatus();
	const { combined } = connectionStatus;
	const rawPhrases = messages.loadingScreen.rotatingMessages;
	const phrases =
		rawPhrases.length > 0
			? (rawPhrases as readonly string[])
			: DEFAULT_LOADING_PHRASES;
	const [phraseIndex, setPhraseIndex] = useState(0);
	const [isPhraseVisible, setIsPhraseVisible] = useState(true);
	const [preloadDone, setPreloadDone] = useState(false);
	const redirectedRef = useRef(false);

	useEffect(() => {
		if (phrases.length <= 1) {
			return;
		}

		let swapTimeoutId: number | undefined;

		const rotateIntervalId = window.setInterval(() => {
			setIsPhraseVisible(false);

			swapTimeoutId = window.setTimeout(() => {
				setPhraseIndex((current) => current + 1);
				setIsPhraseVisible(true);
			}, 220);
		}, 1800);

		return () => {
			window.clearInterval(rotateIntervalId);
			if (swapTimeoutId !== undefined) {
				window.clearTimeout(swapTimeoutId);
			}
		};
	}, [phrases.length, locale]);

	const currentPhrase =
		phrases[phraseIndex % Math.max(phrases.length, 1)] ??
		DEFAULT_LOADING_PHRASES[0];

	// Start the minimum preload timer
	useEffect(() => {
		const id = window.setTimeout(
			() => setPreloadDone(true),
			MIN_PRELOAD_MS,
		);
		return () => window.clearTimeout(id);
	}, []);

	// Redirect once preload timer has elapsed AND connection is established
	useEffect(() => {
		if (!preloadDone || combined !== 'connected' || redirectedRef.current) {
			return;
		}

		redirectedRef.current = true;

		void getCoreUserStatus()
			.catch(() => null)
			.then((status) => {
				if (status?.userExists && status.onboardingCompleted) {
					router.replace('/dashboard');
				} else {
					router.replace('/onboarding');
				}
			});
	}, [preloadDone, combined, router]);

	return (
		<AppViewTransition preset="preload-enter">
			<main className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-100">
				<div className="text-center justify-center items-center flex flex-col max-w-2xl">
					<Logo size="2xl" />
					<h1 className="mt-2 text-6xl text-neutral-200 font-bold text-balance">
						{messages.loadingScreen.title}
					</h1>
					<p
						aria-live="polite"
						className={`mt-4 text-xl text-neutral-500 transition-all duration-300 ${
							isPhraseVisible
								? 'translate-y-0 opacity-100'
								: 'translate-y-1 opacity-0'
						}`}
					>
						{currentPhrase}
					</p>
				</div>
				<footer className="absolute bottom-4 text-center w-full text-sm text-neutral-600 flex items-center justify-center gap-3">
					<span>
						&copy; {new Date().getFullYear()} Kara Assistant. All
						rights reserved.
					</span>
					<ConnectionBadge status={connectionStatus} />
				</footer>
			</main>
		</AppViewTransition>
	);
}
