import { describe, expect, it } from 'vitest';
import getStatusColor from '../../../../src/utils/statusColor';

describe('getStatusColor', () => {
	it('should return the correct class for "canceled" status', () => {
		const result = getStatusColor('canceled');
		expect(result).toBe('text-action-error font-medium');
	});

	it('should return the correct class for "delivered" status', () => {
		const result = getStatusColor('delivered');
		expect(result).toBe('text-action-success font-bold');
	});

	it('should return the correct class for "pending" status', () => {
		const result = getStatusColor('pending');
		expect(result).toBe('text-neutral-black font-medium');
	});

	it('should return the correct class for an unknown status', () => {
		const result = getStatusColor('unknown');
		expect(result).toBe('text-neutral-black font-medium');
	});

	it('should handle case-insensitivity for status', () => {
		const result1 = getStatusColor('CANCELED');
		const result2 = getStatusColor('cAnCeLeD');
		const result3 = getStatusColor('PENDING');
		expect(result1).toBe('text-action-error font-medium');
		expect(result2).toBe('text-action-error font-medium');
		expect(result3).toBe('text-neutral-black font-medium');
	});

	it('should handle empty string as status', () => {
		const result = getStatusColor('');
		expect(result).toBe('text-neutral-black font-medium');
	});
});
