/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useCheckwished from '../../src/hooks/useCheckWishlist';
import AllProvider from '../Utils/AllProvider';

vi.mock('../../src/hooks/useWishcontext', async (importOriginal) => {
	const original =
		await importOriginal<typeof import('../../src/hooks/useWishcontext')>();
	return {
		__esModule: true,
		...original,
		useWishcontext: () => ({
			data: [
				{
					id: '12',
					product: {
						id: '123',
						name: 'Product 1',
					},
				},
			],
		}),
	};
});

describe('usePagination', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('render custom hook and  sets currentPage to 0', () => {
		const { result } = renderHook(() => useCheckwished('3434'), {
			wrapper: AllProvider,
		});
		expect(result?.current?.wished).toBeDefined();
		expect(result?.current?.wished).toEqual(false);
		expect(result?.current?.setWished).toBeDefined();
	});
});
