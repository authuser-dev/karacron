export function Logo({
	size = 'md',
}: {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}) {
	const sizeClasses = {
		xs: 'w-4 h-4',
		sm: 'w-8 h-8',
		md: 'w-12 h-12',
		lg: 'w-16 h-16',
		xl: 'w-24 h-24',
		'2xl': 'w-32 h-32',
	};

	return (
		<img
			src="/image/logo.png"
			alt="Kara"
			className={`${sizeClasses[size]} invert dark:invert-0`}
		/>
	);
}
