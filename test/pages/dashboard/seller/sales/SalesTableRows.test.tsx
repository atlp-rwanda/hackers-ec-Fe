import React from 'react';
import {
	render,
	screen,
	fireEvent,
	RenderOptions,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, vi, beforeEach } from 'vitest';
import SalesTableRow from '../../../../../src/pages/dashboard/seller/Sales/SalesTableRows';
import salesReducer, {
	openModal,
} from '../../../../../src/redux/features/Sales/AllSaleSlice';
import { RootState } from '../../../../../src/redux/store';

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
	deliveryDate: '2023-07-16',
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

		expect(screen.getByText('Test Product')).toBeDefined();
		expect(screen.getByText('5')).toBeDefined();
		expect(screen.getByText('Pending')).toBeDefined();
		expect(screen.getByText('2023-07-16')).toBeDefined();
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

		const row = screen.getByRole('row');
		fireEvent.click(row);
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

	it('applies correct class for even index', () => {
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

		const row = screen.getByRole('row');
		expect(row).toHaveClass('relative text-sm');
		expect(row).not.toHaveClass('bg-evenRawsbg');
	});

	it('applies correct class for odd index', () => {
		renderWithProviders(
			<table>
				<tbody>
					<SalesTableRow
						sale={mockSale}
						index={1}
						formatDate={mockFormatDate}
						getStatusClass={mockGetStatusClass}
					/>
				</tbody>
			</table>,
		);

		const row = screen.getByRole('row');
		expect(row).toHaveClass('relative text-sm bg-evenRawsbg');
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
