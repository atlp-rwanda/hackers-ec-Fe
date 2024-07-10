import { combineReducers, configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Orders from '../../../../../src/pages/dashboard/buyer/order/Orders';
import ordersReducer from '../../../../../src/redux/features/OrdersSlice';

vi.mock('react-icons/fa6', () => ({
	FaHeart: () => <div data-testid="fa-heart" />,
}));
vi.mock('react-spinners', () => ({
	ScaleLoader: () => (
		<div role="progressbar" aria-label="single_product_loder" />
	),
}));
vi.mock('../../../../../src/components/dashboard/buyer/OrderTableRow', () => ({
	__esModule: true,
	default: () => (
		<tr>
			<td>OrderRow</td>
		</tr>
	),
}));
vi.mock('../../../../../src/components/dashboard/buyer/Pagination', () => ({
	__esModule: true,
	default: ({
		onPageChange,
	}: {
		onPageChange: (event: { selected: number }) => void;
	}) => (
		<div
			data-testid="pagination"
			onClick={() => onPageChange({ selected: 1 })}
		/>
	),
}));
vi.mock('../../../../../src/redux/features/orderSlices', () => ({
	__esModule: true,
	getOrders: vi.fn(),
}));
vi.mock('../../../../../src/utils/images', () => ({
	__esModule: true,
	order_icon: 'order-icon-path',
}));

const renderWithProviders = (
	ui: React.ReactElement,
	{
		initialState,
		store = configureStore({
			reducer: combineReducers({
				order: ordersReducer,
			}),
			preloadedState: initialState,
		}),
	}: { initialState: { order: any }; store?: any } = {
		initialState: {
			order: {
				isLoading: false,
				orders: [],
				numberOfOrder: 0,
				singleOrder: [],
				error: null,
			},
		},
	},
) => {
	return render(
		<Provider store={store}>
			<BrowserRouter>{ui}</BrowserRouter>
		</Provider>,
	);
};

describe('Orders component', () => {
	const initialState = {
		order: {
			isLoading: false,
			numberOfOrder: 5,
			orders: [
				{
					id: 1,
					orderDate: '2023-01-01',
					deliveryDate: '2023-01-02',
					items: 3,
					totalQuantity: 5,
					totalPrice: 50,
					status: 'Delivered',
				},
			],
		},
	};

	it('should display the loading indicator when isLoading is true', () => {
		const loadingState = {
			...initialState,
			order: { ...initialState.order, isLoading: true, orders: [] },
		};
		renderWithProviders(<Orders />, { initialState: loadingState });
		expect(
			screen.getByRole('progressbar', { name: /single_product_loder/i }),
		).toBeInTheDocument();
	});
});
