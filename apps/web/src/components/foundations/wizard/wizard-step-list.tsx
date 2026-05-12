'use client';

import { cx } from '@util/cx';
import type { ReactNode } from 'react';
import { useWizard } from './wizard-context';

interface WizardStepListProps {
	className?: string;
}

function CheckIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-4"
			data-icon
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2.5}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}

type StepStatus = 'completed' | 'active' | 'pending';

function getStepStatus(stepIndex: number, currentIndex: number): StepStatus {
	if (stepIndex < currentIndex) return 'completed';
	if (stepIndex === currentIndex) return 'active';
	return 'pending';
}

interface StepIndicatorProps {
	status: StepStatus;
	number: number;
	icon?: ReactNode;
}

function StepIndicator({ status, number, icon }: StepIndicatorProps) {
	return (
		<span
			className={cx(
				'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
				status === 'completed' && 'bg-brand-solid text-white',
				status === 'active' &&
					'bg-brand-solid text-white ring-4 ring-brand-solid/20',
				status === 'pending' && 'bg-tertiary text-quaternary',
			)}
		>
			{status === 'completed' ? (
				<CheckIcon />
			) : icon ? (
				icon
			) : (
				<span>{number}</span>
			)}
		</span>
	);
}

export function WizardStepList({ className }: WizardStepListProps) {
	const { steps, currentIndex } = useWizard();

	return (
		<nav
			aria-label="wizard steps"
			className={cx('flex flex-col gap-0', className)}
		>
			{steps.map((step, index) => {
				const status = getStepStatus(index, currentIndex);
				const isLast = index === steps.length - 1;

				return (
					<div key={step.id} className="flex items-stretch gap-3">
						{/* Indicator + connector */}
						<div className="flex flex-col items-center">
							<StepIndicator
								icon={step.icon}
								number={index + 1}
								status={status}
							/>
							{!isLast && (
								<span
									className={cx(
										'mt-1 w-0.5 flex-1 transition-colors',
										index < currentIndex
											? 'bg-brand-solid'
											: 'bg-border-secondary',
									)}
								/>
							)}
						</div>

						{/* Text */}
						<div className={cx('pb-6 pt-1', isLast && 'pb-0')}>
							<p
								className={cx(
									'text-sm font-semibold leading-none transition-colors',
									status === 'active'
										? 'text-primary'
										: status === 'completed'
											? 'text-secondary'
											: 'text-quaternary',
								)}
							>
								{step.title}
							</p>
							{step.description && (
								<p
									className={cx(
										'mt-1 text-sm transition-colors',
										status === 'active'
											? 'text-secondary'
											: 'text-quaternary',
									)}
								>
									{step.description}
								</p>
							)}
						</div>
					</div>
				);
			})}
		</nav>
	);
}
