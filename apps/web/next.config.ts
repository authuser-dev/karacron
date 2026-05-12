import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	distDir: 'dist',
	output: 'export',
	experimental: {
		viewTransition: true,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**',
			},
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	transpilePackages: [],
};

export default nextConfig;
