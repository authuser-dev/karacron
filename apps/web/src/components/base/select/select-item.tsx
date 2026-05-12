'use client';

import { Avatar } from '@base/avatar/avatar';
import { CheckboxBase } from '@base/checkbox/checkbox';
import { Check } from '@untitledui/icons';
import { cx } from '@util/cx';
import { isReactComponent } from '@util/is-react-component';
import { isValidElement, useContext } from 'react';
import type { ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components';
import {
	ListBoxItem as AriaListBoxItem,
	Text as AriaText,
} from 'react-aria-components';
import type { SelectItemType } from './select-shared';
import { SelectContext } from './select-shared';

const sizes = {
	sm: {
		root: 'p-2 pr-2.5 gap-2 *:data-icon:size-4 *:data-icon:stroke-[2.25px]',
		text: 'text-sm',
		textContainer: 'gap-x-1.5',
		check: 'size-4 stroke-[2.25px]',
		checkbox: 'sm' as const,
	},
	md: {
		root: 'p-2 pr-2.5 gap-2 *:data-icon:size-5',
		text: 'text-md',
		textContainer: 'gap-x-2',
		check: 'size-5',
		checkbox: 'sm' as const,
	},
	lg: {
		root: 'p-2.5 pl-2 gap-2 *:data-icon:size-5',
		text: 'text-md',
		textContainer: 'gap-x-2',
		check: 'size-5',
		checkbox: 'md' as const,
	},
};

interface SelectItemProps
	extends Omit<AriaListBoxItemProps<SelectItemType>, 'id'>, SelectItemType {
	/** The selection indicator to be displayed on the item. */
	selectionIndicator?: 'checkmark' | 'checkbox' | 'none';
	/** The alignment of the selection indicator. */
	selectionIndicatorAlign?: 'left' | 'right';
	/** Visual variant used to render group labels inside a list. */
	variant?: 'default' | 'groupLabel';
}

export const SelectItem = ({
	label,
	id,
	value,
	avatarUrl,
	supportingText,
	isDisabled,
	icon: Icon,
	className,
	children,
	selectionIndicator = 'checkmark',
	selectionIndicatorAlign = 'right',
	variant = 'default',
	...props
}: SelectItemProps) => {
	const { size } = useContext(SelectContext);

	const labelOrChildren =
		label || (typeof children === 'string' ? children : '');
	const textValue = supportingText
		? labelOrChildren + ' ' + supportingText
		: labelOrChildren;

	const isLeft = selectionIndicatorAlign === 'left';

	return (
		<AriaListBoxItem
			id={id}
			value={
				value ?? {
					id,
					label: labelOrChildren,
					avatarUrl,
					supportingText,
					isDisabled,
					icon: Icon,
				}
			}
			textValue={textValue}
			isDisabled={isDisabled}
			{...props}
			className={(state) =>
				cx(
					'w-full py-px outline-hidden',
					size === 'sm' ? 'px-1' : 'px-1.5',
					variant === 'groupLabel' && 'pointer-events-none',
					typeof className === 'function'
						? className(state)
						: className,
				)
			}
		>
			{(state) => (
				<div
					className={cx(
						variant === 'groupLabel'
							? 'px-2 pt-2 pb-1.5'
							: 'flex cursor-pointer items-center rounded-md outline-hidden select-none',
						variant === 'default' &&
							(state.isFocused ||
								state.isHovered ||
								(state.isSelected &&
									selectionIndicator !== 'checkbox')) &&
							'bg-primary_hover',
						variant === 'default' &&
							state.isDisabled &&
							'cursor-not-allowed opacity-50',
						variant === 'default' &&
							state.isFocusVisible &&
							'ring-2 ring-focus-ring ring-inset',

						// Icon styles
						variant === 'default' &&
							'*:data-icon:shrink-0 *:data-icon:text-fg-quaternary',

						variant === 'default' && sizes[size].root,
					)}
				>
					{variant === 'default' &&
						isLeft &&
						selectionIndicator === 'checkbox' && (
							<CheckboxBase
								size={sizes[size].checkbox}
								isSelected={state.isSelected}
								isDisabled={state.isDisabled}
							/>
						)}

					{variant === 'default' && avatarUrl ? (
						<Avatar
							aria-hidden="true"
							size="xs"
							src={avatarUrl}
							alt={label}
							className={cx(size === 'sm' && 'size-5')}
						/>
					) : variant === 'default' && isReactComponent(Icon) ? (
						<Icon data-icon aria-hidden="true" />
					) : variant === 'default' && isValidElement(Icon) ? (
						Icon
					) : null}

					<div
						className={cx(
							variant === 'groupLabel'
								? 'relative w-full pl-1'
								: 'flex w-full min-w-0 flex-1 flex-wrap',
							variant === 'default' && sizes[size].textContainer,
						)}
					>
						{variant === 'groupLabel' && (
							<span
								aria-hidden="true"
								className="absolute inset-x-0 top-0 border-t border-secondary"
							/>
						)}
						<AriaText
							slot="label"
							className={cx(
								variant === 'groupLabel'
									? 'truncate pt-2 text-xs font-semibold tracking-[0.08em] text-quaternary uppercase'
									: 'truncate font-medium whitespace-nowrap text-primary',
								variant === 'default' && sizes[size].text,
							)}
						>
							{label ||
								(typeof children === 'function'
									? children(state)
									: children)}
						</AriaText>

						{variant === 'default' && supportingText && (
							<AriaText
								slot="description"
								className={cx(
									'whitespace-nowrap text-tertiary',
									sizes[size].text,
								)}
							>
								{supportingText}
							</AriaText>
						)}
					</div>

					{variant === 'default' &&
						state.isSelected &&
						selectionIndicator === 'checkmark' && (
							<Check
								aria-hidden="true"
								className={cx(
									'ml-auto text-fg-brand-primary',
									sizes[size].check,
								)}
							/>
						)}

					{variant === 'default' &&
						!isLeft &&
						selectionIndicator === 'checkbox' && (
							<CheckboxBase
								size={sizes[size].checkbox}
								isSelected={state.isSelected}
								isDisabled={state.isDisabled}
								className="ml-auto"
							/>
						)}
				</div>
			)}
		</AriaListBoxItem>
	);
};
