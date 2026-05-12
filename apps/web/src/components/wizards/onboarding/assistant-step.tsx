'use client';

import { useI18n } from '@/src/providers/locale-provider';
import { ComboBox } from '@base/select/combobox';
import { Select } from '@base/select/select';
import { SelectItem } from '@base/select/select-item';
import { useWizard } from '@foundation/wizard';
import {
	buildGroupedSpecializationOptions,
	type GroupedSpecializationOption,
} from '@util/assistant-personality-groups';
import {
	getCoreAssistantPersonalities,
	getCoreAssistantTones,
} from '@util/core-assistant-api';
import type { Key } from 'react';
import { useEffect, useState } from 'react';
import { Input } from '../../base/input/input';
import { TextArea } from '../../base/textarea/textarea';

interface AssistantStepProps {
	assistantName: string;
	behaviorTypeId: string;
	toneId: string;
	preferredName: string;
	onAssistantNameChange: (value: string) => void;
	onBehaviorTypeIdChange: (
		value: string | ((prev: string) => string),
	) => void;
	onToneIdChange: (value: string | ((prev: string) => string)) => void;
	onPreferredNameChange: (value: string) => void;
}

interface ToneOption {
	id: string;
	label: string;
}

export function AssistantStep({
	assistantName,
	behaviorTypeId,
	toneId,
	preferredName,
	onAssistantNameChange,
	onBehaviorTypeIdChange,
	onToneIdChange,
	onPreferredNameChange,
}: AssistantStepProps) {
	const { setCurrentValidity } = useWizard();
	const { locale, messages } = useI18n();
	const [specializationOptions, setSpecializationOptions] = useState<
		GroupedSpecializationOption[]
	>([]);
	const [toneOptions, setToneOptions] = useState<ToneOption[]>([]);

	// Load specializations from backend
	useEffect(() => {
		let isMounted = true;
		void (async () => {
			try {
				const personalities =
					await getCoreAssistantPersonalities(locale);

				if (!isMounted || personalities.length === 0) return;
				const options = buildGroupedSpecializationOptions(
					personalities,
					messages.onboardingWizard.assistant
						.specializationGroupLabels,
				);
				setSpecializationOptions(options);
				const def = personalities.find((p) => p.isDefault);
				onBehaviorTypeIdChange(
					(prev) => prev || def?.id || personalities[0]?.id || '',
				);
			} catch {
				if (!isMounted) return;
				setSpecializationOptions([]);
			}
		})();
		return () => {
			isMounted = false;
		};
	}, [locale, messages, onBehaviorTypeIdChange]);

	// Load tones from backend
	useEffect(() => {
		let isMounted = true;
		void (async () => {
			try {
				const tones = await getCoreAssistantTones(locale);
				if (!isMounted || tones.length === 0) return;
				const options = tones.map((t) => ({
					id: t.id,
					label: t.displayName,
				}));
				setToneOptions(options);
				const def = tones.find((t) => t.isDefault);
				onToneIdChange((prev) => prev || def?.id || tones[0]?.id || '');
			} catch {
				if (!isMounted) return;
				setToneOptions([]);
			}
		})();
		return () => {
			isMounted = false;
		};
	}, [locale, onToneIdChange]);

	useEffect(() => {
		setCurrentValidity(
			assistantName.trim().length > 0 &&
				behaviorTypeId.trim().length > 0 &&
				toneId.trim().length > 0,
		);
	}, [assistantName, behaviorTypeId, toneId, setCurrentValidity]);

	const groupPrefix = 'group-';

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-row gap-4">
				<Input
					isRequired
					label={
						messages.onboardingWizard.assistant.assistantNameLabel
					}
					placeholder={
						messages.onboardingWizard.assistant
							.assistantNamePlaceholder
					}
					value={assistantName}
					onChange={onAssistantNameChange}
				/>
				<Input
					label={
						messages.onboardingWizard.assistant.preferredNameLabel
					}
					placeholder={
						messages.onboardingWizard.assistant
							.preferredNamePlaceholder
					}
					value={preferredName}
					onChange={onPreferredNameChange}
				/>
			</div>
			<div className="flex flex-row gap-4">
				<ComboBox
					key={`spec-${locale}`}
					isRequired
					label={
						messages.onboardingWizard.assistant.specializationLabel
					}
					placeholder={
						messages.onboardingWizard.assistant
							.specializationPlaceholder
					}
					selectedKey={behaviorTypeId}
					onSelectionChange={(key) => {
						const value = String(key as Key);
						if (value.startsWith(groupPrefix)) {
							return;
						}
						onBehaviorTypeIdChange(value);
					}}
					items={specializationOptions}
					className="w-full"
				>
					{(item) => (
						<SelectItem
							id={item.id}
							isDisabled={item.isDisabled}
							selectionIndicator={
								item.isGroupLabel ? 'none' : 'checkmark'
							}
							variant={
								item.isGroupLabel ? 'groupLabel' : 'default'
							}
						>
							{item.label}
						</SelectItem>
					)}
				</ComboBox>
				<Select
					key={`tone-${locale}`}
					isRequired
					label={messages.onboardingWizard.assistant.toneLabel}
					placeholder={
						messages.onboardingWizard.assistant.tonePlaceholder
					}
					selectedKey={toneId}
					onSelectionChange={(key) =>
						onToneIdChange(String(key as Key))
					}
					items={toneOptions}
					className="w-full"
				>
					{(item) => (
						<SelectItem id={item.id}>{item.label}</SelectItem>
					)}
				</Select>
			</div>
			<TextArea
				label={
					messages.onboardingWizard.assistant.assistantBehaviorLabel
				}
				placeholder={
					messages.onboardingWizard.assistant
						.assistantBehaviorPlaceholder
				}
				rows={4}
			/>
		</div>
	);
}
