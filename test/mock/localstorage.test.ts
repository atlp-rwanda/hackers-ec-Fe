import { describe, it, expect, beforeEach } from 'vitest';
import { localStorageMock } from './localStorage';
import { ResizeObserver } from './localStorage';

describe('localStorageMock', () => {
	beforeEach(() => {
		localStorageMock.clear();
	});

	it('should remove an item from the store', () => {
		// @ts-expect-error ignore
		localStorageMock.setItem('testKey', 'testValue');
		expect(localStorageMock.getItem('testKey')).toBe('testValue');

		localStorageMock.removeItem('testKey');
		expect(localStorageMock.getItem('testKey')).toBe(null);
	});

	it('should not throw an error when removing a non-existent item', () => {
		expect(() => localStorageMock.removeItem('nonExistentKey')).not.toThrow();
	});
});

describe('ResizeObserver', () => {
	it('should set the callback in the constructor', () => {
		const mockCallback = vi.fn();
		const resizeObserver = new ResizeObserver(mockCallback);
		expect(resizeObserver.callback).toBe(mockCallback);
	});

	it('should have an observe method', () => {
		const resizeObserver = new ResizeObserver(() => {});
		expect(resizeObserver.observe).toBeDefined();
		expect(typeof resizeObserver.observe).toBe('function');
		expect(() => resizeObserver.observe()).not.toThrow();
	});

	it('should have an unobserve method', () => {
		const resizeObserver = new ResizeObserver(() => {});
		expect(resizeObserver.unobserve).toBeDefined();
		expect(typeof resizeObserver.unobserve).toBe('function');
		expect(() => resizeObserver.unobserve()).not.toThrow();
	});

	it('should have a disconnect method', () => {
		const resizeObserver = new ResizeObserver(() => {});
		expect(resizeObserver.disconnect).toBeDefined();
		expect(typeof resizeObserver.disconnect).toBe('function');
		expect(() => resizeObserver.disconnect()).not.toThrow();
	});
});
