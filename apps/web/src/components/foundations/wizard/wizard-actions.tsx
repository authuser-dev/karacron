'use client';

import { Button } from '@base/buttons/button';
import { cx } from '@util/cx';
import { useWizard } from './wizard-context';

export interface WizardActionLabels {
	back?: string;
	next?: string;
	finish?: string;
}

interface WizardActionsProps {
	labels?: WizardActionLabels;
	className?: string;
	onFinish?: () => void;
}

export function WizardActions({
	labels,
	className,
	onFinish,
}: WizardActionsProps) {
	const { isFirst, isLast, canAdvance, goNext, goBack, finish } = useWizard();

	const backLabel = labels?.back ?? 'Back';
	const nextLabel = labels?.next ?? 'Next';
	const finishLabel = labels?.finish ?? 'Finish';

	function handleFinish() {
		finish();
		onFinish?.();
	}

	return (
		<div
			className={cx(
				'flex items-center justify-between border-t border-secondary pt-4',
				className,
			)}
		>
			<Button
				color="secondary"
				isDisabled={isFirst}
				size="md"
				onClick={goBack}
			>
				{backLabel}
			</Button>

			{isLast ? (
				<Button
					color="primary"
					isDisabled={!canAdvance}
					size="md"
					onClick={handleFinish}
				>
					{finishLabel}
				</Button>
			) : (
				<Button
					color="primary"
					isDisabled={!canAdvance}
					size="md"
					onClick={goNext}
				>
					{nextLabel}
				</Button>
			)}
		</div>
	);
}
