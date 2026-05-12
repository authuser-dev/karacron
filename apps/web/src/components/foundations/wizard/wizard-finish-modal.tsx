'use client';

import { Button } from '@base/buttons/button';
import { cx } from '@util/cx';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface WizardFinishModalProps {
	isOpen: boolean;
	title: string;
	description?: string;
	/** Seconds to count down before calling onComplete. Defaults to 5. */
	countdownSeconds?: number;
	/** Label for the countdown text. Receives the remaining seconds. */
	countdownLabel?: (seconds: number) => string;
	/** Label for the manual dismiss/continue button (shown before countdown ends). */
	dismissLabel?: string;
	onComplete: () => void;
	/** Optional icon to display at the top of the modal */
	icon?: ReactNode;
}

export function WizardFinishModal({
	isOpen,
	title,
	description,
	countdownSeconds = 5,
	countdownLabel,
	dismissLabel,
	onComplete,
	icon,
}: WizardFinishModalProps) {
	const [remaining, setRemaining] = useState(countdownSeconds);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const completedRef = useRef(false);

	function completeOnce() {
		if (completedRef.current) return;
		completedRef.current = true;
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		onComplete();
	}

	useEffect(() => {
		if (!isOpen) {
			completedRef.current = false;
			setRemaining(countdownSeconds);
			return;
		}

		intervalRef.current = setInterval(() => {
			setRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
		}, 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isOpen, countdownSeconds]);

	useEffect(() => {
		if (isOpen && remaining === 0) {
			completeOnce();
		}
	}, [isOpen, remaining]);

	if (!isOpen) return null;

	const countdownText = countdownLabel
		? countdownLabel(remaining)
		: `Redirecting in ${remaining}s…`;

	return (
		/* Backdrop */
		<div
			aria-modal="true"
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
			role="dialog"
		>
			<div
				className={cx(
					'relative w-full max-w-sm rounded-2xl bg-primary p-8 shadow-xl',
					'flex flex-col items-center gap-4 text-center',
				)}
			>
				{icon && (
					<div className="mb-2 flex items-center justify-center">
						{icon}
					</div>
				)}

				<h2 className="text-xl font-semibold text-primary">{title}</h2>

				{description && (
					<p className="text-sm text-secondary">{description}</p>
				)}

				<p className="mt-1 text-sm font-medium text-brand-secondary">
					{countdownText}
				</p>

				{dismissLabel && (
					<Button
						className="mt-2 w-full"
						color="primary"
						size="md"
						onClick={completeOnce}
					>
						{dismissLabel}
					</Button>
				)}
			</div>
		</div>
	);
}
