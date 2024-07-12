// useWishcontext.test.tsx
import React from 'react';
import { renderHook } from '@testing-library/react';
import { ThemeContext } from '../../src/hooks/useWishcontext';
import { describe, it, expect } from 'vitest';
import { useWishcontext } from '../../src/hooks/useWishcontext';
import useCheckwished from '../../src/hooks/useCheckWishlist';
import AllProvider from '../Utils/AllProvider';

const mockWishes = [
	{ id: 1, product: { id: 123, name: 'Wish 1' } },
	{ id: 2, product: { id: 432, name: 'Wish 2' } },
];

describe('useWishcontext', () => {
	it('should return the wishes from the context', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<ThemeContext.Provider value={mockWishes}>
				{children}
			</ThemeContext.Provider>
		);
		const { result } = renderHook(() => useWishcontext(), { wrapper });
		expect(result.current.wishes).toEqual(mockWishes);
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
