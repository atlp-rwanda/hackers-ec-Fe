import { DynamicData } from '../../src/@types/DynamicData';

export const localStorageMock = (() => {
	let store: DynamicData = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: { toString: () => DynamicData }) => {
			store[key] = value.toString();
		},
		clear: () => {
			store = {};
		},
		removeItem: (key: string) => {
			delete store[key];
		},
	};
})();

export class ResizeObserver {
	callback: DynamicData;
	constructor(callback: DynamicData) {
		this.callback = callback;
	}
	observe() {}
	unobserve() {}
	disconnect() {}
}
