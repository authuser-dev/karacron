'use client';

import { cx } from '@util/cx';
import { useEffect, type ReactNode } from 'react';
import { useWizard } from './wizard-context';

interface WizardPanelProps {
	/** Must match the `id` of the step defined in WizardProvider */
	stepId: string;
	/** Controls whether the Next/Finish action is enabled for this step */
	isValid?: boolean;
	className?: string;
	children: ReactNode;
}

export function WizardPanel({
	stepId,
	isValid = true,
	className,
	children,
}: WizardPanelProps) {
	const { currentStep, setCurrentValidity } = useWizard();
	const isActive = currentStep.id === stepId;

	useEffect(() => {
		if (isActive) {
			setCurrentValidity(isValid);
		}
	}, [isActive, isValid, setCurrentValidity]);

	if (!isActive) return null;

	return (
		<div
			aria-current="step"
			className={cx('flex flex-1 flex-col', className)}
		>
			{children}
		</div>
	);
}
