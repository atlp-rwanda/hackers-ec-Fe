import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { server } from './mock/server';
import { DynamicData } from '../src/@types/DynamicData';
import 'vitest-canvas-mock';

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

global.matchMedia =
	global.matchMedia ||
	function (query: DynamicData) {
		return {
			matches: false,
			media: query,
			onchange: null,
			addListener: function () {},
			removeListener: function () {},
			addEventListener: function () {},
			removeEventListener: function () {},
			dispatchEvent: function () {},
		};
	};
