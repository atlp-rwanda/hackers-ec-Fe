import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import CartPage from '../../../src/components/carts/CartPage';
import { useAppSelector } from '../../../src/redux/hooks/hooks';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { payModel } from '../../../src/redux/features/toggleSlice';

const mockStore = configureStore([]);

vi.mock('../../../src/redux/hooks/hooks', () => {
	const actual = vi.importActual('../../../src/redux/hooks/hooks');
	return {
		...actual,
		useAppSelector: vi.fn(),
		useAppDispatch: vi.fn(() => vi.fn()),
	};
});

vi.mock('../../../src/components/buttons/CartQuantity', () => ({
	__esModule: true,
	default: ({ productId }: { productId: string }) => (
		<div data-testid={`cart-quantity-${productId}`}>CartQuantity</div>
	),
}));

vi.mock('../../../src/components/buttons/RemoveCart', () => ({
	__esModule: true,
	default: ({ productId }: { productId: string }) => (
		<button data-testid={`remove-cart-${productId}`}>RemoveCartButton</button>
	),
}));

vi.mock('../../../src/components/payment/PaymentToggleModel', () => ({
	__esModule: true,
	default: () => (
		<div data-testid="payment-toggle-model">PaymentToggleModel</div>
	),
}));

describe('CartPage', () => {
	beforeEach(() => {
		(useAppSelector as Mock).mockReturnValue({
			carts: {
				total: 2000,
				products: [
					{
						id: '1',
						name: 'Product 1',
						price: 1000,
						image: 'image1.jpg',
					},
					{
						id: '2',
						name: 'Product 2',
						price: 1000,
						image: 'image2.jpg',
					},
				],
			},
			numberOfItem: 2,
			toggle: {
				openTaggle: false,
			},
		});
	});

	it('renders the Checkout button with correct total price and displays PaymentToggleModel when clicked', async () => {
		const initialState = {
			cart: {
				carts: {
					total: '2000',
					products: [
						{
							id: '1',
							name: 'Product 1',
							price: 1000,
							image: 'image1.jpg',
						},
						{
							id: '2',
							name: 'Product 2',
							price: 1000,
							image: 'image2.jpg',
						},
					],
				},
				numberOfItem: 2,
			},
			toggle: {
				openTaggle: false,
			},
		};

		const store = mockStore(initialState);

		const { rerender } = render(
			<Provider store={store}>
				<CartPage />
			</Provider>,
		);

		const user = userEvent.setup();

		const checkoutButton = screen.getByRole('button', { name: /Checkout/i });
		await user.click(checkoutButton);

		store.dispatch(payModel());

		rerender(
			<Provider store={store}>
				<CartPage />
			</Provider>,
		);
	});
});
