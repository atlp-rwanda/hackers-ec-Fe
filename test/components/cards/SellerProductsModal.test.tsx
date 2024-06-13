<<<<<<< HEAD
import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import { SellerProductsModal } from '../../../src/components/cards/SellerProductsModal';
import AllProvider from '../../Utils/AllProvider';

describe('Product page modal', () => {
	it('should open modal when the delete button is clicked', () => {
		const modal = (idx: number) => idx;
		const item = { id: 'item123' };
		const state = {};

		render(
			<SellerProductsModal
				id="123"
				idx={1}
				item={item}
				state={state}
				handleToggle={modal}
			/>,
			{
				wrapper: AllProvider,
			},
		);

		expect(screen.getByText(/preview/i)).toBeInTheDocument();
		fireEvent.click(screen.getByText(/delete product/i));
=======
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
>>>>>>> fce9eae (feat(Register): Users should be able Signup/Register to the E-commerce App)
	});
});
