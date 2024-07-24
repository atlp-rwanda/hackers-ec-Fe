import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SingleOrders from '../../../../../src/pages/dashboard/buyer/order/SingleOrders';
import orderReducer from '../../../../../src/redux/features/OrdersSlice';

const renderWithRedux = (
	component: React.ReactNode,
	{
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		initialState,
		store = configureStore({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			reducer: { order: orderReducer },
			preloadedState: initialState,
		}),
	} = {},
) => {
	return render(
		<Provider store={store}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>,
	);
};

describe('SingleOrder', () => {
	const mockOrderData = {
		id: '12345',
		sales: [
			{
				deliveryDate: '2023-07-09T00:00:00Z',
				quantitySold: 2,
				soldProducts: {
					images: ['image_url'],
					name: 'Product 1',
					price: 100,
				},
				status: 'Delivered',
			},
		],
		status: 'Completed',
	};

	const mockPaginatedSales = [
		{
			deliveryDate: '2023-07-09T00:00:00Z',
			quantitySold: 2,
			soldProducts: {
				images: ['image_url'],
				name: 'Product 1',
				price: 100,
			},
			status: 'Delivered',
		},
	];

	it('renders loading spinner when isLoading is true', async () => {
		try {
			renderWithRedux(<SingleOrders />, {
				initialState: {
					order: { isLoading: true, SingleOrderArray: [], paginatedSales: [] },
				},
			});

			expect(
				screen.getByRole('progressbar', { name: /menu/i }),
			).toBeInTheDocument();
		} catch (error) {
			console.error('Test error:', error);
			throw error;
		}
	});

	it('renders order details and product cards when isLoading is false', async () => {
		try {
			renderWithRedux(<SingleOrders />, {
				initialState: {
					order: {
						isLoading: false,
						singleOrder: [mockOrderData],
						paginatedSales: mockPaginatedSales,
					},
				},
			});
			screen.debug();
			expect(screen.getByText(/Order Id:/i)).toBeInTheDocument();
			expect(screen.getByText(/#12345/i)).toBeInTheDocument();
			expect(screen.getByText(/Delivery Date:/i)).toBeInTheDocument();
			expect(screen.getByText(/Items:/i)).toBeInTheDocument();
			expect(screen.getByText(/Total Price:/i)).toBeInTheDocument();
			expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
			expect(screen.getByText(/100/i)).toBeInTheDocument();
			expect(screen.getByText(/Delivered/i)).toBeInTheDocument();
		} catch (error) {
			console.error('Test error:', error);
			throw error;
		}
	});
});
