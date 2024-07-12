/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest';
import usePagination from '../../src/hooks/usePagination';
import { renderHook, act } from '@testing-library/react';

vi.mock('../../src/hooks/useWishlist', () => ({
	__esModule: true,
	default: () => ({
		isLoading: false,
		data: [
			{
				id: '1',
				product: {
					id: '1',
					name: 'Product 1',
				},
			},
			{
				id: '2',
				product: {
					id: '2',
					name: 'Product 2',
				},
			},
			{
				id: '3',
				product: {
					id: '3',
					name: 'Product 3',
				},
			},
			{
				id: '4',
				product: {
					id: '4',
					name: 'Product 4',
				},
			},
			{
				id: '5',
				product: {
					id: '5',
					name: 'Product 5',
				},
			},
		],
	}),
}));
describe('usePagination', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	test('render custom hook and  sets currentPage to 0', () => {
		const { result } = renderHook(() => usePagination());
		expect(result?.current?.currentItems).toBeDefined();
		expect(result?.current?.isLoading).toBeDefined();
		expect(result?.current?.handlePageClick).toBeDefined();
	});

	test('handlePageClick updates currentPage', () => {
		const { result } = renderHook(() => usePagination());

		act(() => {
			result?.current?.handlePageClick({ selected: 2 });
		});
		expect(result.current?.currentItems).toHaveLength(3);
		expect(result.current?.currentItems[0].product.name).toBe('Product 1');
		expect(result.current?.currentItems[1].product.name).toBe('Product 2');
	});
});
