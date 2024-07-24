import { describe, it, expect } from 'vitest';
import { DynamicData } from '../../../../src/@types/DynamicData';
import {
	calculateTotalPrice,
	calculateTotalQuantity,
} from '../../../../src/utils/orderCalculations';

const sales: DynamicData[] = [
	{ soldProducts: { price: 100 }, quantitySold: 2 },
	{ soldProducts: { price: 200 }, quantitySold: 1 },
	{ soldProducts: { price: 150 }, quantitySold: 3 },
];

describe('orderCalculation', () => {
	describe('calculateTotalPrice', () => {
		it('should calculate the total price correctly', () => {
			const totalPrice = calculateTotalPrice(sales);
			expect(totalPrice).toBe(850);
		});

		it('should return 0 if the sales array is empty', () => {
			const totalPrice = calculateTotalPrice([]);
			expect(totalPrice).toBe(0);
		});

		it('should handle sales with zero quantity sold', () => {
			const salesWithZeroQuantity: DynamicData[] = [
				{ soldProducts: { price: 100 }, quantitySold: 0 },
				{ soldProducts: { price: 200 }, quantitySold: 2 },
			];
			const totalPrice = calculateTotalPrice(salesWithZeroQuantity);
			expect(totalPrice).toBe(400);
		});
	});

	describe('calculateTotalQuantity', () => {
		it('should calculate the total quantity correctly', () => {
			const totalQuantity = calculateTotalQuantity(sales);
			expect(totalQuantity).toBe(6);
		});

		it('should return 0 if the sales array is empty', () => {
			const totalQuantity = calculateTotalQuantity([]);
			expect(totalQuantity).toBe(0);
		});

		it('should handle sales with zero quantity sold', () => {
			const salesWithZeroQuantity: DynamicData[] = [
				{ soldProducts: { price: 100 }, quantitySold: 0 },
				{ soldProducts: { price: 200 }, quantitySold: 2 },
			];
			const totalQuantity = calculateTotalQuantity(salesWithZeroQuantity);
			expect(totalQuantity).toBe(2);
		});
	});
});
