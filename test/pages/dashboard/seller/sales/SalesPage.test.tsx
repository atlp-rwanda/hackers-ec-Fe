import React from 'react';
import {
	render,
	screen,
	fireEvent,
	RenderOptions,
	waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, vi, beforeEach, it } from 'vitest';
import salesReducer, {
	openModal,
} from '../../../../../src/redux/features/Sales/AllSaleSlice';
import { RootState } from '../../../../../src/redux/store';
import SalesPage from '../../../../../src/pages/dashboard/seller/Sales/SalesPage';
import SalesTableRow from '../../../../../src/pages/dashboard/seller/Sales/SalesTableRows';
import { getStatusClass } from '../../../../../src/utils/ColorChange';

type RenderWithProvidersOptions = {
	preloadedState?: Partial<RootState>;
	store?: ReturnType<typeof configureStore>;
} & Omit<RenderOptions, 'queries'>;

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

const mockSale = {
	id: '1',
	soldProducts: {
		name: 'Test Product',
		images: ['test-image.jpg'],
	},
	quantitySold: 5,
	status: 'Pending',
	deliveryDate: '16/7/2023',
};
const mockFormatDate = (date: string) => date;
const mockGetStatusClass = (status: string) => `status-${status.toLowerCase()}`;

const renderWithProviders = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = configureStore({
			// @ts-expect-error ignore
			reducer: { sales: salesReducer },
			preloadedState,
		}),
		...renderOptions
	}: RenderWithProvidersOptions = {},
) => {
	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
		<Provider store={store}>
			<MemoryRouter>{children}</MemoryRouter>
		</Provider>
	);

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
const mockSalesData = [
	{
		buyerId: '1710fb6c-d56f-4e3b-bbbb-361c6cfd7ba3',
		createdAt: '2024-05-30T07:35:36.470Z',
		deliveryDate: '2024-07-20T00:00:00.000Z',
		id: '1781d946-1075-45a1-9ce3-3da1789e700a',
		orderId: '7321d696-1000-45a1-9ce3-3da1789e657e',
		productId: '6f15bcc9-033b-4304-9486-09598705a44f',
		quantitySold: 20,
		soldProducts: {
			id: '6f15bcc9-033b-4304-9486-09598705a44f',
			name: 'Blonde Wig',
			price: 30000,
			images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
			discount: 0,
		},
		status: 'delivered',
		updatedAt: '2024-07-19T22:36:57.015Z',
	},
];

const initialState = {
	isLoading: false,
	allSalesData: mockSalesData,
	singleSaleData: null,
	isModalOpen: false,
};

const mockReducer = (state = initialState) => state;

const store = configureStore({
	reducer: {
		sales: mockReducer,
	},
});

describe('SalesPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('displays loader when isLoading is true', () => {
		const preloadedState = {
			sales: {
				isLoading: true,
				allSalesData: [],
				isModalOpen: false,
				singleSaleData: null,
				error: null,
				selectedSaleId: null,
				deliveryDate: '',
				status: '',
				productName: '',
				productImage: '',
			},
		};
		renderWithProviders(<SalesPage />, { preloadedState });

		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	it('should render table headers and sales data correctly', async () => {
		render(
			<Provider store={store}>
				<SalesPage />
			</Provider>,
		);

		await waitFor(() => {
			expect(screen.getByText('Image')).toBeInTheDocument();
		});

		expect(screen.getByText('Product')).toBeInTheDocument();
		expect(screen.getByText('Quantity')).toBeInTheDocument();
		expect(screen.getByText('Status')).toBeInTheDocument();
		expect(screen.getByText('Delivery date')).toBeInTheDocument();
		expect(screen.getByText('Action')).toBeInTheDocument();

		const tableRows = screen.getAllByRole('row');
		expect(tableRows).toHaveLength(mockSalesData.length + 1);
	});
});

describe('SalesTableRow', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders correctly', () => {
		renderWithProviders(
			<table>
				<tbody>
					<SalesTableRow
						sale={mockSale}
						index={0}
						formatDate={mockFormatDate}
						getStatusClass={mockGetStatusClass}
					/>
				</tbody>
			</table>,
		);

		expect(screen.getByText('Test Product')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.getByText('Pending')).toBeInTheDocument();
		expect(screen.getByText('16/7/2023')).toBeInTheDocument();
	});

	it('handles row click', () => {
		renderWithProviders(
			<table>
				<tbody>
					<SalesTableRow
						sale={mockSale}
						index={0}
						formatDate={mockFormatDate}
						getStatusClass={mockGetStatusClass}
					/>
				</tbody>
			</table>,
		);

		fireEvent.click(screen.getByText('Test Product'));
		expect(mockNavigate).toHaveBeenCalledWith('1');
	});

	it('handles three-dot button click', () => {
		const { store } = renderWithProviders(
			<table>
				<tbody>
					<SalesTableRow
						sale={mockSale}
						index={0}
						formatDate={mockFormatDate}
						getStatusClass={mockGetStatusClass}
					/>
				</tbody>
			</table>,
		);

		fireEvent.click(screen.getByRole('button'));
		const state = store.getState() as RootState;
		expect(state.sales.isModalOpen).toBe(true);
		expect(state.sales.selectedSaleId).toBe('1');
	});

	it('applies correct status class', () => {
		renderWithProviders(
			<table>
				<tbody>
					<SalesTableRow
						sale={mockSale}
						index={0}
						formatDate={mockFormatDate}
						getStatusClass={mockGetStatusClass}
					/>
				</tbody>
			</table>,
		);

		expect(screen.getByText('Pending').className).toContain('status-pending');
	});
});

describe('sales slice', () => {
	it('should handle initial state', () => {
		expect(salesReducer(undefined, { type: 'unknown' })).toEqual({
			allSalesData: [],
			singleSaleData: null,
			isLoading: false,
			error: null,
			isModalOpen: false,
			selectedSaleId: null,
			deliveryDate: '',
			status: '',
			productName: '',
			productImage: '',
		});
	});

	it('should handle openModal', () => {
		const actual = salesReducer(
			undefined,
			openModal({
				id: '1',
				status: 'Pending',
				productImage: 'test.jpg',
				productName: 'Test Product',
				deliveryDate: '2023-07-16',
			}),
		);
		expect(actual.isModalOpen).toEqual(true);
		expect(actual.selectedSaleId).toEqual('1');
	});
});

describe('getStatusClass', () => {
	it('returns "text-red-500" for canceled status', () => {
		expect(getStatusClass('canceled')).toBe('text-red-500');
		expect(getStatusClass('CANCELED')).toBe('text-red-500');
	});

	it('returns "text-green-500" for delivered status', () => {
		expect(getStatusClass('delivered')).toBe('text-green-500');
		expect(getStatusClass('DELIVERED')).toBe('text-green-500');
	});
});
