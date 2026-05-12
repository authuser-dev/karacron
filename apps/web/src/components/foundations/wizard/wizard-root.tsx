'use client';

import { cx } from '@util/cx';
import type { ReactNode } from 'react';
import { type WizardStepDef, WizardProvider } from './wizard-context';
import { WizardStepList } from './wizard-step-list';

interface WizardRootProps {
	steps: WizardStepDef[];
	onFinish?: () => void;
	initialStep?: number;
	/** Override the sidebar column width. Defaults to `w-72`. */
	sidebarClassName?: string;
	/** Override the content column className. */
	contentClassName?: string;
	className?: string;
	children: ReactNode;
}

/**
 * WizardRoot composes WizardProvider with a two-column layout:
 * - Left: step list sidebar
 * - Right: children (panels + actions)
 *
 * @example
 * ```tsx
 * <WizardRoot steps={steps} onFinish={handleFinish}>
 *   <WizardPanel stepId="step-1" isValid={isStep1Valid}>
 *     <Step1Form />
 *   </WizardPanel>
 *   <WizardPanel stepId="step-2" isValid={isStep2Valid}>
 *     <Step2Form />
 *   </WizardPanel>
 *   <WizardActions labels={{ back: 'Back', next: 'Next', finish: 'Done' }} />
 * </WizardRoot>
 * ```
 */
export function WizardRoot({
	steps,
	onFinish,
	initialStep,
	sidebarClassName,
	contentClassName,
	className,
	children,
}: WizardRootProps) {
	return (
		<WizardProvider
			initialStep={initialStep}
			steps={steps}
			onFinish={onFinish}
		>
			<div
				className={cx(
					'flex min-h-0 flex-1 flex-col gap-8 md:flex-row',
					className,
				)}
			>
				{/* Sidebar */}
				<aside className={cx('shrink-0 md:w-72', sidebarClassName)}>
					<WizardStepList />
				</aside>

				{/* Content */}
				<div
					className={cx(
						'flex min-w-0 flex-1 flex-col',
						contentClassName,
					)}
				>
					{children}
				</div>
			</div>
		</WizardProvider>
	);
}
