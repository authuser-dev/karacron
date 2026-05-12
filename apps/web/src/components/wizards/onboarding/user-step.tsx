'use client';

import { useI18n } from '@/src/providers/locale-provider';
import {
	type EmailValidationResult,
	validateCoreEmail,
} from '@/src/utils/core-user-api';
import { DatePicker } from '@application/date-picker/date-picker';
import { Input } from '@base/input/input';
import { TextArea } from '@base/textarea/textarea';
import { useWizard } from '@foundation/wizard';
import { CalendarDate } from '@internationalized/date';
import { useEffect, useRef, useState } from 'react';
import type { DateValue } from 'react-aria-components';

interface UserStepProps {
	name: string;
	lastName: string;
	email: string;
	birthdate: DateValue | null;
	bio: string;
	onNameChange: (value: string) => void;
	onLastNameChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onBirthdateChange: (value: DateValue | null) => void;
	onBioChange: (value: string) => void;
}

export function UserStep({
	name,
	lastName,
	email,
	birthdate,
	bio,
	onNameChange,
	onLastNameChange,
	onEmailChange,
	onBirthdateChange,
	onBioChange,
}: UserStepProps) {
	const { setCurrentValidity } = useWizard();
	const { messages } = useI18n();
	const t = messages.onboardingWizard.user;

	const today = new Date();
	const maxBirthdate = new CalendarDate(
		today.getFullYear() - 18,
		today.getMonth() + 1,
		today.getDate(),
	);
	const minBirthdate = new CalendarDate(1900, 1, 1);

	// Debounced email validation against the backend (regex + MX record)
	const [emailValidation, setEmailValidation] =
		useState<EmailValidationResult | null>(null);
	const [emailIsLoading, setEmailIsLoading] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			if (email.trim().length === 0) {
				setEmailValidation(null);
				setEmailIsLoading(false);
				return;
			}
			setEmailIsLoading(true);
			validateCoreEmail(email.trim())
				.then((result) => {
					setEmailValidation(result);
					setEmailIsLoading(false);
				})
				.catch(() => {
					setEmailValidation({ valid: false, reason: 'dns_error' });
					setEmailIsLoading(false);
				});
		}, 600);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [email]);

	const emailIsInvalid =
		email.trim().length > 0 &&
		emailValidation !== null &&
		!emailValidation.valid;

	useEffect(() => {
		setCurrentValidity(
			name.trim().length > 0 &&
				lastName.trim().length > 0 &&
				email.trim().length > 0 &&
				emailValidation?.valid === true &&
				birthdate !== null,
		);
	}, [name, lastName, email, emailValidation, birthdate, setCurrentValidity]);

	return (
		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-2 gap-4">
				<Input
					isRequired
					label={t.firstNameLabel}
					placeholder={t.firstNamePlaceholder}
					value={name}
					onChange={onNameChange}
				/>
				<Input
					isRequired
					label={t.lastNameLabel}
					placeholder={t.lastNamePlaceholder}
					value={lastName}
					onChange={onLastNameChange}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Input
					isRequired
					label={t.emailLabel}
					placeholder={t.emailPlaceholder}
					type="email"
					value={email}
					onChange={onEmailChange}
					isLoading={emailIsLoading}
					isInvalid={emailIsInvalid}
					hint={emailIsInvalid ? t.errors.emailInvalid : undefined}
				/>
				<DatePicker
					isRequired
					label={t.birthDateLabel}
					selectDateLabel={t.selectDateLabel}
					cancelLabel={t.cancelDateLabel}
					applyLabel={t.applyDateLabel}
					value={birthdate}
					onChange={onBirthdateChange}
					minValue={minBirthdate}
					maxValue={maxBirthdate}
				/>
			</div>

			<TextArea
				label={t.bioLabel}
				placeholder={t.bioPlaceholder}
				value={bio}
				onChange={onBioChange}
				rows={4}
			/>
		</div>
	);
}
