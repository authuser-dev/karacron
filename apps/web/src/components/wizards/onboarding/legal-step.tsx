'use client';

import { MarkdownContent } from '@/src/components/markdown-content';
import { getLegalContent } from '@/src/i18n/legal';
import { useI18n } from '@/src/providers/locale-provider';
import { Checkbox } from '@base/checkbox/checkbox';
import { cx } from '@util/cx';
import { useEffect, useRef, useState } from 'react';

type TabId = 'terms' | 'privacy';

interface LegalStepProps {
	accepted: boolean;
	onAcceptedChange: (value: boolean) => void;
}

export function LegalStep({ accepted, onAcceptedChange }: LegalStepProps) {
	const { locale, messages } = useI18n();
	const t = messages.onboardingWizard.legal;
	const [activeTab, setActiveTab] = useState<TabId>('terms');

	const legal = getLegalContent(locale);

	const sectionLabels = Object.fromEntries(
		t.sections.map((s) => [s.id, s.label]),
	);

	const tabs: { id: TabId; label: string; content: string }[] = [
		{
			id: 'terms',
			label: sectionLabels['terms'] ?? t.sections[0]?.label ?? 'Terms',
			content: legal.terms,
		},
		{
			id: 'privacy',
			label:
				sectionLabels['privacy'] ?? t.sections[1]?.label ?? 'Privacy',
			content: legal.privacy,
		},
	];

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: 0 });
	}, [activeTab]);

	const activeContent = tabs.find((t) => t.id === activeTab)?.content ?? '';

	return (
		<div className="flex flex-col gap-4">
			{/* Tab bar */}
			<div className="flex border-b border-secondary">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={cx(
							'-mb-px px-4 py-2 text-sm font-medium transition-colors',
							activeTab === tab.id
								? 'border-b-2 border-brand-solid text-brand-primary'
								: 'border-b-2 border-transparent text-quaternary hover:text-secondary',
						)}
						type="button"
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Content */}
			<div
				ref={scrollRef}
				className="max-h-96 overflow-auto rounded-lg border border-secondary bg-surface-secondary p-4"
			>
				<MarkdownContent content={activeContent} />
			</div>

			{/* Accept */}
			<Checkbox
				isSelected={accepted}
				label={t.acceptAllLabel}
				onChange={onAcceptedChange}
			/>
		</div>
	);
}
