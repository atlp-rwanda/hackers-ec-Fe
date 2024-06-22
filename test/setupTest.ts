import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { server } from './mock/server';

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

expect.extend(matchers);
