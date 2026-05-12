'use client';

import { Button, type ButtonProps } from '@base/buttons/button';
import { getLocalTimeZone, today } from '@internationalized/date';
import { useControlledState } from '@react-stately/utils';
import { Calendar as CalendarIcon } from '@untitledui/icons';
import { cx } from '@util/cx';
import { useDateFormatter } from 'react-aria';
import type {
	DatePickerProps as AriaDatePickerProps,
	DateValue,
} from 'react-aria-components';
import {
	DatePicker as AriaDatePicker,
	Dialog as AriaDialog,
	Group as AriaGroup,
	Label as AriaLabel,
	Popover as AriaPopover,
} from 'react-aria-components';
import { Calendar } from './calendar';

const highlightedDates = [today(getLocalTimeZone())];

interface DatePickerProps extends AriaDatePickerProps<DateValue> {
	/** The function to call when the apply button is clicked. */
	onApply?: () => void;
	/** The function to call when the cancel button is clicked. */
	onCancel?: () => void;
	/** Label used when no date is selected. */
	selectDateLabel?: string;
	/** Label for the cancel action button. */
	cancelLabel?: string;
	/** Label for the apply action button. */
	applyLabel?: string;
	size?: ButtonProps['size'];
	/** Optional label rendered above the picker button. */
	label?: string;
}

export const DatePicker = ({
	value: valueProp,
	defaultValue,
	onChange,
	onApply,
	label,
	onCancel,
	selectDateLabel = 'Select date',
	cancelLabel = 'Cancel',
	applyLabel = 'Apply',
	size = 'md',
	...props
}: DatePickerProps & { label?: string }) => {
	const formatter = useDateFormatter({
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
	const [value, setValue] = useControlledState(
		valueProp,
		defaultValue || null,
		onChange,
	);

	const formattedDate = value
		? formatter.format(value.toDate(getLocalTimeZone()))
		: selectDateLabel;

	return (
		<AriaDatePicker
			aria-label={label ?? 'Date picker'}
			shouldCloseOnSelect={false}
			{...props}
			value={value}
			onChange={setValue}
			className={(state) =>
				cx(
					'flex w-full flex-col items-start gap-1.5',
					typeof props.className === 'function'
						? props.className(state)
						: props.className,
				)
			}
		>
			{({ isRequired }) => (
				<>
					{label && (
						<AriaLabel
							className={cx(
								'flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary',
								isRequired &&
									'after:text-brand-tertiary after:content-["_*"]',
							)}
						>
							{label}
						</AriaLabel>
					)}
					<AriaGroup className="w-full">
						<Button
							size={size}
							color="secondary"
							iconLeading={CalendarIcon}
							className="w-full justify-start"
						>
							{formattedDate}
						</Button>
					</AriaGroup>
					<AriaPopover
						offset={8}
						placement="bottom left"
						className={({ isEntering, isExiting }) =>
							cx(
								'origin-(--trigger-anchor-point) will-change-transform',
								isEntering &&
									'duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5',
								isExiting &&
									'duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5',
							)
						}
					>
						<AriaDialog
							aria-label="Date picker"
							className="rounded-2xl bg-primary shadow-xl ring ring-secondary_alt"
						>
							{({ close }) => (
								<>
									<div className="flex px-6 py-5">
										<Calendar
											highlightedDates={highlightedDates}
										>
											<></>
										</Calendar>
									</div>
									<div className="grid grid-cols-2 gap-3 border-t border-secondary p-4">
										<Button
											size="md"
											color="secondary"
											onClick={() => {
												onCancel?.();
												close();
											}}
										>
											{cancelLabel}
										</Button>
										<Button
											size="md"
											color="primary"
											onClick={() => {
												onApply?.();
												close();
											}}
										>
											{applyLabel}
										</Button>
									</div>
								</>
							)}
						</AriaDialog>
					</AriaPopover>
				</>
			)}
		</AriaDatePicker>
	);
};
