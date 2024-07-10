import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SingleSale from '../../../../../src/pages/dashboard/seller/Sales/SingleSale';

vi.mock('../../../../redux/hooks/hooks', () => ({
	useAppDispatch: vi.fn(),
	useAppSelector: vi.fn(),
}));

vi.mock('../../../../redux/features/Sales/AllSaleSlice', () => ({
	getSingleSale: vi.fn(),
}));

describe('SingleSale Component', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let store: any;
	const initialState = {
		sales: {
			singleSaleData: {
				data: {
					status: 'Completed',
					deliveryDate: '2023-07-20',
					quantitySold: 5,
					soldProducts: {
						name: 'Test Product',
						price: 100,
						discount: 10,
						quantity: 50,
						expiryDate: '2024-07-20',
						isAvailable: true,
						images: ['test-image-url'],
					},
				},
			},
			isLoading: false,
		},
	};

	beforeEach(() => {
		const mockStore = configureStore([]);
		store = mockStore(initialState);
	});

	const renderComponent = () => {
		return render(
			<Provider store={store}>
				<MemoryRouter>
					<SingleSale />
				</MemoryRouter>
			</Provider>,
		);
	};

	it('renders loading state', () => {
		const mockStore = configureStore([]);
		store = mockStore({
			sales: { ...initialState.sales, isLoading: true },
		});
		renderComponent();
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	it('renders sale details when data is available', () => {
		renderComponent();
		expect(screen.getByText('Status: Completed')).toBeInTheDocument();
		expect(screen.getByText('Delivery date: 20/7/2023')).toBeInTheDocument();
		expect(screen.getByText('Quantity sold: 5')).toBeInTheDocument();
	});

	it('renders product information', () => {
		renderComponent();
		expect(screen.getByText('Final price: 90')).toBeInTheDocument();
		expect(screen.getByText('Available Quantity: 50')).toBeInTheDocument();
		expect(screen.getByText('Expiry Date: 20/7/2024')).toBeInTheDocument();
		expect(screen.getByText('Is Available: Yes')).toBeInTheDocument();
	});

	it('renders product image', () => {
		renderComponent();
		const image = screen.getByRole('img', { name: /product image/i });
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'test-image-url');
	});

	it('should render back button correctly', () => {
		renderComponent();
		const backButton = screen.getByRole('button');
		expect(backButton).toBeInTheDocument();
	});

	it('should go back to all sales page when back button is clicked', () => {
		renderComponent();
		const backButton = screen.getByRole('button');
		expect(backButton.closest('a')).toHaveAttribute('href', '/dashboard/sales');
	});

	it('should render without crashing', () => {
		renderComponent();
		expect(screen.getByText('Sale details')).toBeInTheDocument();
	});
});
