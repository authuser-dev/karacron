'use client';

import { Button } from '@/src/components/base/buttons/button';
import { LanguageSwitcher } from '@/src/components/language-switcher';
import { Logo } from '@/src/components/logo';
import { ThemeToggle } from '@/src/components/theme-toggle';
import {
	AssistantStep,
	LegalStep,
	PermissionsStep,
	UserStep,
} from '@/src/components/wizards/onboarding';
import { useI18n } from '@/src/providers/locale-provider';
import {
	useWizard,
	WizardFinishModal,
	WizardPanel,
	WizardProvider,
	WizardStepList,
	type WizardStepDef,
} from '@foundation/wizard';
import { updateCoreAssistantConfig } from '@util/core-assistant-api';
import {
	createCoreUser,
	getCoreUserStatus,
	updateCurrentCoreUser,
} from '@util/core-user-api';
import { Bot, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { DateValue } from 'react-aria-components';

const STEP_IDS = ['legal', 'user', 'assistant', 'permissions'] as const;

function OnboardingContent() {
	const { currentStep, isFirst, isLast, canAdvance, goNext, goBack } =
		useWizard();
	const router = useRouter();
	const { messages } = useI18n();
	const t = messages.onboardingScreen;
	const tw = messages.onboardingWizard;
	const [legalAccepted, setLegalAccepted] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [finishError, setFinishError] = useState<string | null>(null);
	const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

	// User step state
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthdate] = useState<DateValue | null>(null);
	const [bio, setBio] = useState('');

	// Assistant step state
	const [assistantName, setAssistantName] = useState('Kara');
	const [behaviorTypeId, setBehaviorTypeId] = useState('');
	const [toneId, setToneId] = useState('');
	const [preferredName, setPreferredName] = useState('');

	// Permissions step state
	const [permissionsEnabled, setPermissionsEnabled] = useState<
		Record<string, boolean>
	>({});

	const [selectedDisks, setSelectedDisks] = useState<string[]>([]);

	async function persistOnboarding(): Promise<void> {
		const payload = {
			name: name.trim(),
			lastName: lastName.trim(),
			email: email.trim(),
			birthDate: birthdate ? birthdate.toString() : undefined,
			description: bio.trim() || undefined,
			onboardingCompleted: true,
			preferences: {
				preferredName: preferredName.trim() || null,
				permissionsEnabled,
				selectedDisks,
			},
		};

		const status = await getCoreUserStatus().catch(() => null);
		if (status?.userExists) {
			await updateCurrentCoreUser(payload);
		} else {
			try {
				await createCoreUser(payload);
			} catch (err: any) {
				// Only fallback to update if user already exists (409 Conflict)
				if (err?.status === 409) {
					await updateCurrentCoreUser(payload);
				} else {
					// Re-throw validation errors or other issues
					throw err;
				}
			}
		}

		try {
			await updateCoreAssistantConfig({
				assistantName: assistantName.trim(),
				activePersonalityId: behaviorTypeId,
				activeToneId: toneId,
			});
		} catch {
			// Keep onboarding completion even if selected IDs are not accepted by backend.
			await updateCoreAssistantConfig({
				assistantName: assistantName.trim(),
			});
		}
	}

	async function handleFinish(): Promise<void> {
		if (isSaving) return;

		setIsSaving(true);
		setFinishError(null);
		try {
			await persistOnboarding();
			setIsFinishModalOpen(true);
		} catch {
			setFinishError(
				'No pudimos guardar tu configuración. Reintenta en unos segundos.',
			);
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<div className="mx-auto grid h-full w-full grid-cols-1 gap-10  lg:grid-cols-[minmax(320px,25%)_minmax(0,75%)]">
			<section className="relative flex h-full flex-col justify-between overflow-hidden px-4 py-10 sm:px-6 lg:px-8 bg-neutral-900">
				<div>
					<Logo size="lg" />
					<header className="mt-4 space-y-2">
						<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
							{t.welcomeTitle}
						</h1>
						<p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
							{t.welcomeSubtitle}
						</p>
					</header>
					{/* Aqui va el listad de pasos  del wizard*/}
					<WizardStepList className="mt-8" />
				</div>
				<footer className="">
					<div className="flex items-center gap-2">
						<ThemeToggle showLabel={false} />
						<LanguageSwitcher showLabel={false} />
					</div>
				</footer>
			</section>
			<section className="relative flex h-full flex-col justify-between gap-10 overflow-hidden pr-10 ">
				<header className="mt-8 space-y-2">
					<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
						{currentStep.title}
					</h1>
					<p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
						{currentStep.description}
					</p>
				</header>
				<div className="min-h-0 flex-1 overflow-auto">
					{/* Aqui va el contenido del paso del wizard */}
					<WizardPanel stepId="legal" isValid={legalAccepted}>
						<LegalStep
							accepted={legalAccepted}
							onAcceptedChange={setLegalAccepted}
						/>
					</WizardPanel>
					<WizardPanel stepId="user">
						<UserStep
							name={name}
							lastName={lastName}
							email={email}
							birthdate={birthdate}
							bio={bio}
							onNameChange={setName}
							onLastNameChange={setLastName}
							onEmailChange={setEmail}
							onBirthdateChange={setBirthdate}
							onBioChange={setBio}
						/>
					</WizardPanel>
					<WizardPanel stepId="assistant">
						<AssistantStep
							assistantName={assistantName}
							behaviorTypeId={behaviorTypeId}
							toneId={toneId}
							preferredName={preferredName}
							onAssistantNameChange={setAssistantName}
							onBehaviorTypeIdChange={setBehaviorTypeId}
							onToneIdChange={setToneId}
							onPreferredNameChange={setPreferredName}
						/>
					</WizardPanel>
					<WizardPanel stepId="permissions">
						<PermissionsStep
							enabled={permissionsEnabled}
							onEnabledChange={setPermissionsEnabled}
							selectedDisks={selectedDisks}
							onSelectedDisksChange={setSelectedDisks}
						/>
					</WizardPanel>
				</div>
				<footer className="mt-8 space-y-2 mb-8">
					{finishError && (
						<p className="text-sm text-error" role="alert">
							{finishError}
						</p>
					)}
					<div className="flex items-center gap-2">
						<Button
							color="secondary"
							size="lg"
							isDisabled={isFirst}
							onClick={goBack}
						>
							{tw.backLabel}
						</Button>
						<Button
							color="primary"
							size="lg"
							isDisabled={!canAdvance || isSaving}
							onClick={
								isLast ? () => void handleFinish() : goNext
							}
						>
							{isLast
								? isSaving
									? 'Guardando...'
									: tw.finishLabel
								: tw.nextLabel}
						</Button>
					</div>
				</footer>
			</section>

			<WizardFinishModal
				isOpen={isFinishModalOpen}
				title={`Boom, ${assistantName.trim() || 'Kara'} ya está en línea`}
				description={`Todo quedó guardado en la base de datos. ${assistantName.trim() || 'Kara'} se está despertando con toda tu vibra. Prepárate para el dashboard.`}
				countdownSeconds={4}
				countdownLabel={(seconds) =>
					`Entramos al dashboard en ${seconds}s...`
				}
				dismissLabel="Entrar ahora"
				onComplete={() => {
					setIsFinishModalOpen(false);
					router.replace('/dashboard');
				}}
				icon={
					<div className="relative">
						<Bot className="size-10 text-brand-solid" />
						<Sparkles className="absolute -right-2 -top-2 size-5 text-brand-secondary" />
					</div>
				}
			/>
		</div>
	);
}

function OnboardingWizard() {
	const { messages } = useI18n();
	const t = messages.onboardingScreen;

	const steps: WizardStepDef[] = STEP_IDS.map((id, i) => ({
		id,
		title: t.steps[i]!.title,
		description: t.steps[i]!.description,
	}));

	return (
		<WizardProvider steps={steps}>
			<OnboardingContent />
		</WizardProvider>
	);
}

export default function OnboardingPage() {
	return (
		<main className="h-screen overflow-hidden bg-neutral-50 text-neutral-950 transition-colors dark:bg-neutral-950 dark:text-neutral-100">
			<OnboardingWizard />
		</main>
	);
}
