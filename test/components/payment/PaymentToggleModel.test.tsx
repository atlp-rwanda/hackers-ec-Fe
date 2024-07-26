import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { it, expect, describe, vi } from 'vitest';
import configureStore from 'redux-mock-store';
import PaymentToggleModel from '../../../src/components/payment/PaymentToggleModel';
import { payModel } from '../../../src/redux/features/toggleSlice';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

vi.mock('../../src/assets/momo.png', () => 'momoIcon');
vi.mock('../../src/assets/stripe icon.png', () => 'stripeIcon');
vi.mock('../../src/assets/cancel.png', () => 'cancelIcon');

describe('PaymentToggleModel component', () => {
	it('should render the PaymentToggleModel component with buttons', () => {
		const initialState = {
			momo: {},
			stripe: {
				data: { data: { sessionUrl: 'http://example.com' } },
				isLoading: false,
			},
			toggle: {
				isOpen: true,
			},
		};

		const store = mockStore(initialState);

		render(
			<Provider store={store}>
				<BrowserRouter>
					<PaymentToggleModel />
				</BrowserRouter>
			</Provider>,
		);

		expect(screen.getByText(/Continue payment with:/i)).toBeInTheDocument();

		expect(screen.getByText(/Mobile Money/i)).toBeInTheDocument();

		expect(screen.getByText(/Stripe/i)).toBeInTheDocument();

		expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
	});

	it('should handle Cancel button click', () => {
		const initialState = {
			momo: {},
			stripe: {
				data: { data: { sessionUrl: 'http://example.com' } },
				isLoading: false,
			},
			toggle: {
				isOpen: true,
			},
		};

		const store = mockStore(initialState);

		store.dispatch = vi.fn();

		render(
			<Provider store={store}>
				<MemoryRouter>
					<PaymentToggleModel />
				</MemoryRouter>
			</Provider>,
		);

		fireEvent.click(screen.getByText(/Cancel/i));

		expect(store.dispatch).toHaveBeenCalledWith(payModel());
	});
});
