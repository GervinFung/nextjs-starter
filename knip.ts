import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: [
		'pages/api/**/*.ts',
		'pages/**/*.tsx',
		'src/**/*.tsx',
		'src/**/*.ts',
		'script/**/*.s',
	],
	ignore: [
		'next-sitemap.config.js',
		'script/env/copy.ts',
		'script/site/webmanifest.ts',
	],
	ignoreDependencies: [
		'vite-node',
		'next-sitemap',
		'prettier',
		'@poolofdeath20/prettier-config-generator',
		'eslint',
	],
};

export default config;
