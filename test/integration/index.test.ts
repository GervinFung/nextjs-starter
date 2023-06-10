import { beforeAll, afterAll, describe } from 'vitest';
import Server from '../server';

const testIntegration = () => {
    const server = Server.create();
    beforeAll(async () => {
        await server.start();
    });
    describe('Integration Test', () => {});
    afterAll(() => {
        server.kill();
    });
};

testIntegration();
