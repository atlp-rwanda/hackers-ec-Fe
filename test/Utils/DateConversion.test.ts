import { describe, it, expect } from 'vitest';
import formatDate from '../../src/utils/DateConversion';

describe('formatDate', () => {
	it('formats date string correctly', () => {
		const testCases = [
			{ input: '2023-07-16T00:00:00.000Z', expected: '16/7/2023' },
			{ input: '2023-01-01T00:00:00.000Z', expected: '1/1/2023' },
			{ input: '2023-12-31T00:00:00.000Z', expected: '31/12/2023' },
		];

		testCases.forEach(({ input, expected }) => {
			expect(formatDate(input)).toBe(expected);
		});
	});

	it('handles different time zones correctly', () => {
		const dateString = '2023-07-16T23:59:59.999Z';
		expect(formatDate(dateString)).toBe('16/7/2023');
	});

	it('handles leap years correctly', () => {
		const leapYearDate = '2024-02-29T00:00:00.000Z';
		expect(formatDate(leapYearDate)).toBe('29/2/2024');
	});
});
