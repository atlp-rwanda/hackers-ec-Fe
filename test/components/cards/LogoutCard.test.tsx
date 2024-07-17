/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LogoutCard from '../../../src/components/cards/LogoutCard';
import logoutReducer from '../../../src/redux/features/logoutSlice';

const renderWithProviders = (ui: any, { preloadedState = {} } = {}) => {
	const store = configureStore({
		reducer: {
			logout: logoutReducer,
		},
		preloadedState,
	});

	return render(
		<Provider store={store}>
			<BrowserRouter>{ui}</BrowserRouter>
		</Provider>,
	);
};

describe('LogoutCard component', () => {
	const renderComponent = (preloadedState = {}) => {
		renderWithProviders(<LogoutCard />, { preloadedState });
	};

	it('should render the logout button', () => {
		renderComponent();
		expect(screen.getByText(/logout/i)).toBeInTheDocument();
	});

	it('should navigate to home when logged out', async () => {
		const preloadedState = {
			logout: {
				isLoading: false,
				isLoggedOut: true,
			},
		};

		renderComponent(preloadedState);
		const user = userEvent.setup();

		const logoutBtn = screen.getByText(/logout/i);
		await user.click(logoutBtn);

		expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
	});
});
