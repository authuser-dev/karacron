import type { CoreAssistantPersonality } from '@util/core-assistant-api';

export type GroupedSpecializationOption = {
	id: string;
	label: string;
	isDisabled?: boolean;
	isGroupLabel?: boolean;
};

const GROUP_ORDER = [
	'general',
	'engineering',
	'creative',
	'management',
	'science',
	'arts',
	'humanities',
	'business',
	'other',
] as const;

type GroupKey = (typeof GROUP_ORDER)[number];

export type SpecializationGroupLabels = Record<GroupKey, string>;

const DEFAULT_GROUP_LABELS: SpecializationGroupLabels = {
	general: 'General',
	engineering: 'Engineering',
	creative: 'Creative',
	management: 'Management',
	science: 'Science',
	arts: 'Arts',
	humanities: 'Humanities',
	business: 'Business',
	other: 'Other',
};

function normalizeDomain(domain: string | null): string {
	if (!domain) {
		return 'other';
	}

	const normalized = domain.trim().toLowerCase();

	return GROUP_ORDER.includes(normalized as (typeof GROUP_ORDER)[number])
		? normalized
		: 'other';
}

export function buildGroupedSpecializationOptions(
	personalities: CoreAssistantPersonality[],
	groupLabels: Partial<SpecializationGroupLabels>,
): GroupedSpecializationOption[] {
	const resolvedLabels: SpecializationGroupLabels = {
		...DEFAULT_GROUP_LABELS,
		...groupLabels,
	};

	const grouped = new Map<string, CoreAssistantPersonality[]>();

	for (const personality of personalities) {
		const group = normalizeDomain(personality.domain);
		const current = grouped.get(group) ?? [];
		current.push(personality);
		grouped.set(group, current);
	}

	const out: GroupedSpecializationOption[] = [];

	for (const group of GROUP_ORDER) {
		const items = grouped.get(group);
		if (!items || items.length === 0) {
			continue;
		}

		out.push({
			id: `group-${group}`,
			label: resolvedLabels[group],
			isDisabled: true,
			isGroupLabel: true,
		});

		for (const item of items) {
			out.push({
				id: item.id,
				label: item.displayName,
			});
		}
	}

	return out;
}
