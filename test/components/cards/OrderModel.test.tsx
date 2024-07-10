import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DynamicData } from '../../../src/@types/DynamicData';
import { OrderModel } from '../../../src/components/cards/orderModel';

vi.mock('lucide-react', () => ({
	ShoppingBasket: () => <div data-testid="shopping-basket" />,
}));
vi.mock('react-icons/io5', () => ({
	IoClose: ({ onClick }: { onClick: () => void }) => (
		<div data-testid="close-icon" onClick={onClick} />
	),
}));

describe('OrderModel component', () => {
	const mockHandleToggle = vi.fn();
	const mockItem: DynamicData = {
		id: '1',
		name: 'Test Product',
		price: 100,
		quantitySold: 2,
		soldProducts: { price: 100 },
	};

	const renderWithProviders = (ui: React.ReactElement) => {
		return render(<BrowserRouter>{ui}</BrowserRouter>);
	};

	it('should render the component with the View More link', () => {
		renderWithProviders(
			<OrderModel
				id="1"
				idx={0}
				item={mockItem}
				state={{}}
				handleToggle={mockHandleToggle}
			/>,
		);

		const viewMoreLink = screen.getByText(/View More/i);
		expect(viewMoreLink).toBeInTheDocument();
		expect(viewMoreLink.closest('a')).toHaveAttribute('href', '/orders/1');
		expect(screen.getByTestId('shopping-basket')).toBeInTheDocument();
	});

	it('should call handleToggle when the close icon is clicked', () => {
		renderWithProviders(
			<OrderModel
				id="1"
				idx={0}
				item={mockItem}
				state={{}}
				handleToggle={mockHandleToggle}
			/>,
		);

		const closeIcon = screen.getByTestId('close-icon');
		expect(closeIcon).toBeInTheDocument();

		fireEvent.click(closeIcon);
		expect(mockHandleToggle).toHaveBeenCalledWith(0);
	});
});
