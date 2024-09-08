import type { Browser } from 'puppeteer';

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';

import Server from '../server';

import { getWebSnapshot } from './browser';

const testSnapshot = () => {
	const server = Server.of(8080);

	let browser: undefined | Browser = undefined;

	beforeAll(async () => {
		await server.start();
		browser = await puppeteer.launch({
			headless: true,
			defaultViewport: null,
			args: ['--start-maximized'],
		});
	});

	describe('Snapshot Test', () => {
		expect.extend({ toMatchImageSnapshot });

		it.each(
			(['pc', 'tablet', 'mobile'] as const).flatMap((platform) => {
				return (['home', 'projects', 'contact', 'error'] as const).map(
					(link) => {
						return {
							platform,
							link,
						};
					}
				);
			})
		)(
			'should detect that layout of $link looks decent on $platform',
			async ({ link, platform }) => {
				if (!browser) {
					throw new TypeError('browser is undefined');
				}

				const dir = `${__dirname}/snapshot-images/${platform}`;
				const { image } = await getWebSnapshot({
					link,
					browser,
					platform,
					port: server.getPort(),
				});
				expect(image).toMatchImageSnapshot({
					customSnapshotsDir: dir,
					customSnapshotIdentifier: link,
					failureThreshold: 0.01,
					failureThresholdType: 'percent',
				});
			}
		);
	});

	afterAll(() => {
		server.kill();
		void browser?.close();
	});
};

testSnapshot();
