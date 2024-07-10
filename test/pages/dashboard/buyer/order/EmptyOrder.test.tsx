import { render, screen } from '@testing-library/react';
import EmptyOrder from '../../../../../src/pages/dashboard/buyer/order/EmptyOrder';

vi.mock('../../../../../src/components/buttons/BackButton', () => ({
	__esModule: true,
	default: ({ title }: { title: string }) => <button>{title}</button>,
}));

vi.mock('../../../../../src/utils/images', () => ({
	emptyOrder: 'empty-order-icon',
}));

describe('OrderIsEmpty Component', () => {
	it('should renders empty order image', () => {
		render(<EmptyOrder />);
		const image = screen.getByAltText('empty order icon');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'empty-order-icon');
	});

	it('should renders "No Orders Placed Yet" text', () => {
		render(<EmptyOrder />);
		const heading = screen.getByText('No Orders Placed Yet');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveClass('text-center font-bold text-2xl');
	});

	it('should renders descriptive text', () => {
		render(<EmptyOrder />);
		const description = screen.getByText(
			'No orders found. Why not browse our selection ?',
		);
		expect(description).toBeInTheDocument();
		expect(description).toHaveClass('text-center');
	});

	it('should renders BackButton with correct text', () => {
		render(<EmptyOrder />);
		const button = screen.getByText('Time to shop !');
		expect(button).toBeInTheDocument();
		expect(button.tagName).toBe('BUTTON');
	});
});
