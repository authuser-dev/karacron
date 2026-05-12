'use client';

import type { ReactNode } from 'react';
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

export interface WizardStepDef {
	id: string;
	title: string;
	description?: string;
	icon?: ReactNode;
}

interface WizardContextValue {
	steps: WizardStepDef[];
	currentIndex: number;
	currentStep: WizardStepDef;
	isFirst: boolean;
	isLast: boolean;
	isFinished: boolean;
	canAdvance: boolean;
	goNext: () => void;
	goBack: () => void;
	finish: () => void;
	setCurrentValidity: (valid: boolean) => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function useWizard(): WizardContextValue {
	const ctx = useContext(WizardContext);
	if (!ctx) {
		throw new Error('useWizard must be used inside WizardProvider');
	}
	return ctx;
}

interface WizardProviderProps {
	steps: WizardStepDef[];
	onFinish?: () => void;
	initialStep?: number;
	children: ReactNode;
}

export function WizardProvider({
	steps,
	onFinish,
	initialStep = 0,
	children,
}: WizardProviderProps) {
	const [currentIndex, setCurrentIndex] = useState(initialStep);
	const [isFinished, setIsFinished] = useState(false);
	const [canAdvance, setCanAdvance] = useState(false);

	const isFirst = currentIndex === 0;
	const isLast = currentIndex === steps.length - 1;
	const currentStep = steps[currentIndex]!;

	const goNext = useCallback(() => {
		if (!isLast) {
			setCurrentIndex((i) => i + 1);
			setCanAdvance(false);
		}
	}, [isLast]);

	const goBack = useCallback(() => {
		if (!isFirst) {
			setCurrentIndex((i) => i - 1);
			setCanAdvance(true);
		}
	}, [isFirst]);

	const finish = useCallback(() => {
		setIsFinished(true);
		onFinish?.();
	}, [onFinish]);

	const setCurrentValidity = useCallback((valid: boolean) => {
		setCanAdvance(valid);
	}, []);

	const value = useMemo<WizardContextValue>(
		() => ({
			steps,
			currentIndex,
			currentStep,
			isFirst,
			isLast,
			isFinished,
			canAdvance,
			goNext,
			goBack,
			finish,
			setCurrentValidity,
		}),
		[
			steps,
			currentIndex,
			currentStep,
			isFirst,
			isLast,
			isFinished,
			canAdvance,
			goNext,
			goBack,
			finish,
			setCurrentValidity,
		],
	);

	return (
		<WizardContext.Provider value={value}>
			{children}
		</WizardContext.Provider>
	);
}
