import { beforeAll, afterAll, describe } from 'vitest';

import Server from '../server';

const testIntegration = () => {
	const server = Server.of(8080);

	beforeAll(async () => {
		await server.start();
	});

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	describe('Integration Test', () => {});

	afterAll(() => {
		server.kill();
	});
};

testIntegration();
