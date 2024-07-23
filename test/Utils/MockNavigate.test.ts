import { describe, it, expect } from 'vitest';
import useNavigate, { mockNavigate } from '../../src/utils/MockNavigate';

describe('useNavigate', () => {
	it('returns the mockNavigate function', () => {
		const navigate = useNavigate();
		expect(navigate).toBe(mockNavigate);
	});

	it('mockNavigate is a function', () => {
		expect(typeof mockNavigate).toBe('function');
	});

	it('mockNavigate returns undefined', () => {
		expect(mockNavigate()).toBeUndefined();
	});
});
