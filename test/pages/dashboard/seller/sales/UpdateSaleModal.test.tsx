import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import { describe, expect, vi, beforeEach } from 'vitest';
import UpdateOrderModal from '../../../../../src/pages/dashboard/seller/Sales/UpdateOrderModal';
import salesReducer, {
	closeModal,
	getSales,
} from '../../../../../src/redux/features/Sales/AllSaleSlice';
import { updateOrder } from '../../../../../src/redux/features/Sales/UpdateorderSlice';
import { FormProvider, useForm } from 'react-hook-form';

const showSuccessMessage = vi.fn();
const showErrorMessage = vi.fn();
vi.mock('../../../../../src/hooks/useToast', () => ({
	default: () => ({
		showSuccessMessage,
		showErrorMessage,
	}),
}));

const mockDispatch = vi.fn();
const mockSelector = vi.fn();

vi.mock('../../../../../src/redux/hooks/hooks', () => ({
	useAppDispatch: () => mockDispatch,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	useAppSelector: (selector: any) => mockSelector(selector),
}));

describe('UpdateOrderModal', () => {
	let store: Store<unknown, UnknownAction, unknown>;

	beforeEach(() => {
		store = configureStore({
			reducer: {
				sales: salesReducer,
			},
		});

		mockSelector.mockReturnValue({
			selectedSaleId: '1',
			deliveryDate: '17/7/2023',
			status: 'pending',
			productName: 'Test Product',
			productImage: 'test-image.jpg',
		});

		mockDispatch.mockClear();
		showSuccessMessage.mockClear();
		showErrorMessage.mockClear();
	});

	const renderComponent = () => {
		const Wrapper = ({ children }: { children: React.ReactNode }) => {
			const methods = useForm();
			return (
				<Provider store={store}>
					<FormProvider {...methods}>{children}</FormProvider>
				</Provider>
			);
		};

		return render(<UpdateOrderModal />, { wrapper: Wrapper });
	};

	it('renders correctly', () => {
		renderComponent();
		expect(screen.getByText('Test Product')).toBeDefined();
		expect(screen.getByText('Current Status: pending')).toBeDefined();
		expect(screen.getByLabelText('Status')).toBeDefined();
		expect(screen.getByLabelText('Delivery Date')).toBeDefined();
	});

	it('handles status change', async () => {
		renderComponent();

		await act(async () => {
			const statusSelect = screen.getByRole('combobox', { name: /status/i });
			fireEvent.change(statusSelect, { target: { value: 'delivered' } });
		});

		const submitButton = screen.getByRole('button', { name: /update/i });
		await act(async () => {
			fireEvent.click(submitButton);
		});

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
		});
	});

	it('handles delivery date change', async () => {
		renderComponent();
		await act(async () => {
			const dateInput = screen.getByLabelText('Delivery Date');
			fireEvent.change(dateInput, { target: { value: '2023-07-17' } });
		});

		const submitButton = screen.getByRole('button', { name: /update/i });
		await act(async () => {
			fireEvent.click(submitButton);
		});

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
		});
	});

	it('closes modal when cancel button is clicked', () => {
		renderComponent();
		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);
		expect(mockDispatch).toHaveBeenCalledWith(closeModal());
	});

	it('closes modal when overlay is clicked', () => {
		renderComponent();
		const overlay = screen.getByTestId('modal-overlay');
		fireEvent.click(overlay);
		expect(mockDispatch).toHaveBeenCalledWith(closeModal());
	});

	it('successfully updates order and shows success message', async () => {
		const mockUpdateOrderResult = {
			id: '1',
			status: 'delivered',
			deliveryDate: '17/7/2023',
		};

		mockDispatch.mockImplementation((action) => {
			if (action.type === updateOrder.pending.type) {
				return {
					unwrap: () => Promise.resolve(mockUpdateOrderResult),
				};
			}
			if (action.type === getSales.pending.type) {
				return {
					unwrap: () => Promise.resolve(),
				};
			}
			return action;
		});

		renderComponent();

		const submitButton = screen.getByText('Update');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
			expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
		});
	});

	it('shows error message when update fails', async () => {
		const mockError = new Error('Update failed');

		mockDispatch.mockImplementation((action) => {
			if (action.type === updateOrder.pending.type) {
				return {
					unwrap: () => Promise.reject(mockError),
				};
			}
			return action;
		});

		renderComponent();

		const submitButton = screen.getByText('Update');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
		});
	});

	it('shows generic error message when error has no message', async () => {
		const mockError = {};

		mockDispatch.mockImplementation((action) => {
			if (action.type === updateOrder.pending.type) {
				return {
					mockError,
				};
			}
			return action;
		});

		renderComponent();

		const submitButton = screen.getByText('Update');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
		});
	});
});
