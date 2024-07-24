import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { it, expect, describe, vi } from 'vitest';
import configureStore from 'redux-mock-store';
import PaymentSuccess from '../../src/pages/PaymentSuccess';
import * as router from 'react-router';
import * as hooks from '../../src/hooks/useToast';

const mockStore = configureStore([]);

describe('PaymentSuccess page', () => {
	it('should render the PaymentSuccess page with loading state and navigate on success', () => {
		const initialState = {
			userOrder: {
				data: { data: { order: { id: '12345' } } },
				isLoading: false,
				message: 'Your payment was successful!',
			},
		};

		const store = mockStore(initialState);

		const navigate = vi.fn();
		vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

		const showSuccessMessage = vi.fn();
		const showErrorMessage = vi.fn();
		vi.spyOn(hooks, 'default').mockImplementation(() => ({
			showSuccessMessage,
			showErrorMessage,
			showWarningMessage: () => {},
			showWorningMessage: () => {},
		}));

		render(
			<Provider store={store}>
				<MemoryRouter
					initialEntries={['/payment-success?sessionId=123&payerId=456']}
				>
					<Routes>
						<Route path="/payment-success" element={<PaymentSuccess />} />
					</Routes>
				</MemoryRouter>
			</Provider>,
		);

		expect(navigate).toHaveBeenCalledWith('/orders/12345');
		expect(showSuccessMessage).toHaveBeenCalledWith(
			'Your payment was successful!',
		);
	});
	it('should show a loader', async () => {
		const modifiedStore = mockStore({
			userOrder: {
				data: { data: { order: { id: '12345' } } },
				isLoading: true, // Ensure isLoading is true to test for loader
				message: 'Your payment was successful!',
			},
		});

		render(
			<Provider store={modifiedStore}>
				{' '}
				{/* Add Provider to wrap MemoryRouter */}
				<MemoryRouter
					initialEntries={['/payment-success?sessionId=123&payerId=456']}
				>
					<Routes>
						<Route path="/payment-success" element={<PaymentSuccess />} />
					</Routes>
				</MemoryRouter>
			</Provider>,
		);
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});
});
