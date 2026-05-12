'use client';

import { Button } from '@base/buttons/button';
import { InputDateBase } from '@base/input/input-date';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { ChevronLeft, ChevronRight } from '@untitledui/icons';
import { cx } from '@util/cx';
import type { PropsWithChildren, ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { useDateFormatter } from 'react-aria';
import type {
	CalendarProps as AriaCalendarProps,
	DateValue,
} from 'react-aria-components';
import {
	Calendar as AriaCalendar,
	CalendarContext as AriaCalendarContext,
	CalendarGrid as AriaCalendarGrid,
	CalendarGridBody as AriaCalendarGridBody,
	CalendarGridHeader as AriaCalendarGridHeader,
	CalendarHeaderCell as AriaCalendarHeaderCell,
	useSlottedContext,
} from 'react-aria-components';
import { CalendarCell } from './cell';

export const CalendarContextProvider = ({ children }: PropsWithChildren) => {
	const [value, onChange] = useState<DateValue | null>(null);
	const [focusedValue, onFocusChange] = useState<DateValue | undefined>();

	return (
		<AriaCalendarContext.Provider
			value={{ value, onChange, focusedValue, onFocusChange }}
		>
			{children}
		</AriaCalendarContext.Provider>
	);
};

interface CalendarProps extends AriaCalendarProps<DateValue> {
	/** The dates to highlight. */
	highlightedDates?: DateValue[];
	/**
	 * The content to render between the header and the calendar grid.
	 * If not provided, a default layout will be rendered with a date input and a today button.
	 */
	children?: ReactNode;
}

export const Calendar = ({
	highlightedDates,
	className,
	children,
	...props
}: CalendarProps) => {
	const context = useSlottedContext(AriaCalendarContext);

	const ContextWrapper = context ? Fragment : CalendarContextProvider;

	const maxYear =
		(props.maxValue as CalendarDate | undefined)?.year ??
		today(getLocalTimeZone()).year;
	const minYear = Math.max(
		(props.minValue as CalendarDate | undefined)?.year ?? 1900,
		maxYear - 99,
	);

	const monthFormatter = useDateFormatter({ month: 'long' });
	const months = Array.from({ length: 12 }, (_, i) => ({
		value: i + 1,
		label: monthFormatter.format(new Date(2000, i, 1)),
	}));
	const years = Array.from(
		{ length: maxYear - minYear + 1 },
		(_, i) => maxYear - i,
	);

	return (
		<ContextWrapper>
			<AriaCalendar
				{...props}
				className={(state) =>
					cx(
						'flex flex-col gap-3',
						typeof className === 'function'
							? className(state)
							: className,
					)
				}
			>
				{({ state }) => (
					<>
						<header className="flex items-center justify-between gap-1">
							<Button
								slot="previous"
								iconLeading={ChevronLeft}
								size="sm"
								color="tertiary"
								className="size-8 shrink-0"
							/>
							<div className="flex flex-1 items-center justify-center gap-1">
								<select
									aria-label="Month"
									value={state.focusedDate.month}
									className="cursor-pointer rounded px-1 py-0.5 text-sm font-semibold text-fg-secondary bg-transparent hover:bg-secondary focus:outline-none"
									onChange={(e) => {
										state.setFocusedDate(
											new CalendarDate(
												state.focusedDate.year,
												Number(e.target.value),
												Math.min(
													state.focusedDate.day,
													new Date(
														state.focusedDate.year,
														Number(e.target.value),
														0,
													).getDate(),
												),
											),
										);
									}}
								>
									{months.map((m) => (
										<option key={m.value} value={m.value}>
											{m.label}
										</option>
									))}
								</select>
								<select
									aria-label="Year"
									value={state.focusedDate.year}
									className="cursor-pointer rounded px-1 py-0.5 text-sm font-semibold text-fg-secondary bg-transparent hover:bg-secondary focus:outline-none"
									onChange={(e) => {
										state.setFocusedDate(
											new CalendarDate(
												Number(e.target.value),
												state.focusedDate.month,
												state.focusedDate.day,
											),
										);
									}}
								>
									{years.map((y) => (
										<option key={y} value={y}>
											{y}
										</option>
									))}
								</select>
							</div>
							<Button
								slot="next"
								iconLeading={ChevronRight}
								size="sm"
								color="tertiary"
								className="size-8 shrink-0"
							/>
						</header>

						{children || (
							<div className="flex gap-3">
								<InputDateBase
									aria-label="Date"
									size="sm"
									className="flex-1"
								/>
								<Button
									slot={null}
									size="sm"
									color="secondary"
									onClick={() => {
										state.setValue(
											today(getLocalTimeZone()),
										);
										state.setFocusedDate(
											today(getLocalTimeZone()),
										);
									}}
								>
									Today
								</Button>
							</div>
						)}

						<AriaCalendarGrid
							weekdayStyle="short"
							className="w-max"
						>
							<AriaCalendarGridHeader className="border-b-4 border-transparent">
								{(day) => (
									<AriaCalendarHeaderCell className="p-0">
										<div className="flex size-10 items-center justify-center text-sm font-medium text-secondary">
											{day.slice(0, 2)}
										</div>
									</AriaCalendarHeaderCell>
								)}
							</AriaCalendarGridHeader>
							<AriaCalendarGridBody className="[&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent [&_tr:last-of-type]:border-none">
								{(date) => (
									<CalendarCell
										date={date}
										isHighlighted={highlightedDates?.some(
											(highlightedDate) =>
												date.compare(
													highlightedDate,
												) === 0,
										)}
									/>
								)}
							</AriaCalendarGridBody>
						</AriaCalendarGrid>
					</>
				)}
			</AriaCalendar>
		</ContextWrapper>
	);
};
