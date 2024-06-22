import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import { SellerProductsModal } from '../../../src/components/cards/SellerProductsModal';
import AllProvider from '../../Utils/AllProvider';
describe('Product page modal', () => {
	it('should open model when a button clicked', () => {
		const modal = (idx: number) => idx;
		render(<SellerProductsModal id="123" idx={1} handleToggle={modal} />, {
			wrapper: AllProvider,
		});

		expect(screen.getByText(/preview/i)).toBeInTheDocument();
	});
});
