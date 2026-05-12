import {
	ViewTransition as ReactViewTransition,
	type ComponentProps,
} from 'react';

const transitionPresetProps = {
	'fade-in': {
		default: 'none',
		enter: {
			default: 'fade-in',
		},
	},
	'fade-out': {
		default: 'none',
		exit: {
			default: 'fade-out',
		},
	},
	'slide-left': {
		default: 'none',
		enter: {
			default: 'slide-in-from-right',
		},
		exit: {
			default: 'slide-out-to-left',
		},
	},
	'slide-right': {
		default: 'none',
		enter: {
			default: 'slide-in-from-left',
		},
		exit: {
			default: 'slide-out-to-right',
		},
	},
	'preload-enter': {
		default: 'none',
		enter: {
			'preload-ready': 'preload-enter',
			default: 'none',
		},
	},
	'preload-exit': {
		default: 'none',
		exit: {
			'preload-ready': 'preload-exit',
			default: 'none',
		},
	},
} as const;

export type AppViewTransitionPreset = keyof typeof transitionPresetProps;

export type AppViewTransitionProps = ComponentProps<
	typeof ReactViewTransition
> & {
	preset?: AppViewTransitionPreset;
};

export function AppViewTransition({
	preset = 'fade-in',
	...props
}: AppViewTransitionProps) {
	const presetProps = transitionPresetProps[preset];

	return <ReactViewTransition {...presetProps} {...props} />;
}
