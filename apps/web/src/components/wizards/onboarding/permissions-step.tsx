'use client';

import { useI18n } from '@/src/providers/locale-provider';
import {
	getCoreSystemDisks,
	type CoreSystemDisk,
} from '@/src/utils/core-system-api';
import { useWizard } from '@foundation/wizard';
import { Bell, Camera, HardDrive, Mic, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const PERMISSION_META: Record<string, { icon: LucideIcon }> = {
	camera: { icon: Camera },
	microphone: { icon: Mic },
	notifications: { icon: Bell },
};

interface Permission {
	id: string;
	label: string;
	description: string;
	icon: LucideIcon;
}

interface PermissionsStepProps {
	enabled: Record<string, boolean>;
	onEnabledChange: (value: Record<string, boolean>) => void;
	selectedDisks: string[];
	onSelectedDisksChange: (disks: string[]) => void;
}

function formatBytes(bytes: number): string {
	if (bytes >= 1_073_741_824)
		return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
	if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
	return `${(bytes / 1_024).toFixed(0)} KB`;
}

export function PermissionsStep({
	enabled,
	onEnabledChange,
	selectedDisks,
	onSelectedDisksChange,
}: PermissionsStepProps) {
	const { setCurrentValidity } = useWizard();
	const { messages } = useI18n();
	const t = messages.onboardingWizard.permissions;

	const [disks, setDisks] = useState<CoreSystemDisk[]>([]);
	const [disksLoading, setDisksLoading] = useState(true);
	const [disksError, setDisksError] = useState(false);

	useEffect(() => {
		getCoreSystemDisks()
			.then((d) => setDisks(d))
			.catch(() => setDisksError(true))
			.finally(() => setDisksLoading(false));
	}, []);

	const permissions: Permission[] = t.policyOptions
		.map((option) => {
			const meta = PERMISSION_META[option.slug];
			if (!meta) return null;
			return {
				id: option.slug,
				label: option.label,
				description: option.description,
				icon: meta.icon,
			};
		})
		.filter((p): p is Permission => p !== null);

	useEffect(() => {
		setCurrentValidity(true);
	}, [setCurrentValidity]);

	function toggle(id: string) {
		onEnabledChange({ ...enabled, [id]: !enabled[id] });
	}

	function toggleDisk(id: string) {
		if (selectedDisks.includes(id)) {
			onSelectedDisksChange(selectedDisks.filter((d) => d !== id));
		} else {
			onSelectedDisksChange([...selectedDisks, id]);
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<section className="flex flex-col gap-3">
				<div>
					<p className="text-sm font-semibold text-primary">
						{t.deviceGroupTitle}
					</p>
					<p className="text-sm text-secondary">
						{t.deviceGroupDescription}
					</p>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{permissions.map((permission) => (
						<label
							key={permission.id}
							className="flex cursor-pointer items-start gap-4 rounded-lg border border-secondary bg-surface-secondary p-4 hover:border-brand-solid/50"
						>
							<input
								checked={!!enabled[permission.id]}
								className="mt-0.5 size-4 accent-brand-solid"
								type="checkbox"
								onChange={() => toggle(permission.id)}
							/>
							<div className="flex flex-col gap-0.5">
								<span className="flex items-center gap-2 text-sm font-semibold text-primary">
									<permission.icon className="size-4" />
									{permission.label}
								</span>
								<span className="text-sm text-secondary">
									{permission.description}
								</span>
							</div>
						</label>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-3">
				<div>
					<p className="text-sm font-semibold text-primary">
						{t.disksTitle}
					</p>
					<p className="text-sm text-secondary">
						{t.disksDescription}
					</p>
				</div>
				{disksLoading && (
					<p className="text-sm text-secondary">
						{t.diskLoadingLabel}
					</p>
				)}
				{!disksLoading && disksError && (
					<p className="text-sm text-error">{t.diskLoadError}</p>
				)}
				{!disksLoading && !disksError && disks.length === 0 && (
					<p className="text-sm text-secondary">{t.diskEmptyLabel}</p>
				)}
				{!disksLoading && !disksError && disks.length > 0 && (
					<div className="grid grid-cols-2 gap-3">
						{disks.map((disk) => (
							<label
								key={disk.id}
								className="flex cursor-pointer items-start gap-4 rounded-lg border border-secondary bg-surface-secondary p-4 hover:border-brand-solid/50"
							>
								<input
									checked={selectedDisks.includes(disk.id)}
									className="mt-0.5 size-4 accent-brand-solid"
									type="checkbox"
									onChange={() => toggleDisk(disk.id)}
								/>
								<div className="flex flex-col gap-0.5">
									<span className="flex items-center gap-2 text-sm font-semibold text-primary">
										<HardDrive className="size-4" />
										{disk.label}
									</span>
									<span className="text-sm text-secondary">
										{t.diskFreeFormat
											.replace(
												'{free}',
												formatBytes(disk.freeBytes),
											)
											.replace(
												'{total}',
												formatBytes(disk.totalBytes),
											)}
									</span>
								</div>
							</label>
						))}
					</div>
				)}
			</section>

			<p className="text-xs text-quaternary">{t.footerNote}</p>
		</div>
	);
}
