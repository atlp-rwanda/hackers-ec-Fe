import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ProfileDropdown from '../../src/components/ProfileDropdown';
import logoutReducer from '../../src/redux/features/logoutSlice';
import navReducer from '../../src/redux/features/navSlice';
import notificationReducer from '../../src/redux/features/notificationSlice';
import profileReducer from '../../src/redux/features/userUpdateSlice';
import * as userDetails from '../../src/utils/userDetails';

vi.mock('../../src/utils/userDetails');

const renderWithProviders = (ui: any, { preloadedState = {} } = {}) => {
	const store = configureStore({
		reducer: {
			logout: logoutReducer,
			nav: navReducer,
			profile: profileReducer,
			notifications: notificationReducer,
		},
		preloadedState,
	});

	return render(
		<Provider store={store}>
			<BrowserRouter>{ui}</BrowserRouter>
		</Provider>,
	);
};

describe('ProfileDropdown Component', () => {
	const renderComponent = (preloadedState = {}) => {
		renderWithProviders(<ProfileDropdown image="" />, { preloadedState });
	};

	it('renders the ProfileDropdown component', async () => {
		renderComponent();
		const user = userEvent.setup();

		const dropDownbtn = screen.getByRole('button', { name: /user profile/i });
		await user.click(dropDownbtn);
		expect(screen.getByAltText('User Profile')).toBeInTheDocument();
		expect(dropDownbtn).toBeInTheDocument();
	});

	it('displays the loading state when logout is clicked', async () => {
		const preloadedState = {
			logout: {
				isLoading: false,
				isLoggedOut: false,
			},
		};

		renderComponent(preloadedState);
		const user = userEvent.setup();

		const dropDownbtn = screen.getByRole('button', { name: /user profile/i });
		await user.click(dropDownbtn);

		const logoutBtn = screen.getByText('Logout');
		await user.click(logoutBtn);

		const newState = {
			logout: {
				isLoading: true,
				isLoggedOut: false,
			},
		};

		renderComponent(newState);
		expect(screen.queryByText('processing....')).toBeDefined();
	});

	it('navigates to login when logged out', async () => {
		const preloadedState = {
			logout: {
				isLoading: false,
				isLoggedOut: true,
			},
		};

		renderComponent(preloadedState);
		const user = userEvent.setup();

		const dropDownbtn = screen.getByRole('button', { name: /user profile/i });
		await user.click(dropDownbtn);

		expect(screen.queryByAltText('User Profile')).toBeInTheDocument();
	});

	it('renders "My wishlist" link if user role is BUYER', async () => {
		vi.spyOn(userDetails, 'default').mockImplementation(() => ({
			role: 'BUYER',
		}));

		renderComponent();
		const user = userEvent.setup();

		const dropDownbtn = screen.getByRole('button', { name: /user profile/i });
		await user.click(dropDownbtn);

		expect(screen.getByText('My wishlist')).toBeInTheDocument();
		vi.restoreAllMocks();
	});

	it('does not render "My wishlist" link if user role is not BUYER', async () => {
		vi.spyOn(userDetails, 'default').mockImplementation(() => ({
			role: 'SELLER',
		}));

		renderComponent();
		const user = userEvent.setup();

		const dropDownbtn = screen.getByRole('button', { name: /user profile/i });
		await user.click(dropDownbtn);

		expect(screen.queryByText('My wishlist')).not.toBeInTheDocument();
		vi.restoreAllMocks();
	});

	it('shows loading state when isLoading is true', async () => {
		const preloadedState = {
			logout: {
				isLoading: true,
				isLoggedOut: false,
			},
		};

		renderComponent(preloadedState);
		const user = userEvent.setup();

		const dropDownbtn = screen.getByRole('button', { name: /user profile/i });
		await user.click(dropDownbtn);

		expect(screen.queryByText('processing....')).toBeInTheDocument();
		expect(screen.getByText('processing....')).toBeInTheDocument();
	});

	it('shows logout text when isLoading is false', async () => {
		const preloadedState = {
			logout: {
				isLoading: false,
				isLoggedOut: false,
			},
		};

		renderComponent(preloadedState);
		const user = userEvent.setup();

		const dropDownbtn = screen.getByRole('button', { name: /user profile/i });
		await user.click(dropDownbtn);

		expect(screen.queryByText('Logout')).toBeInTheDocument();
		expect(screen.queryByText('processing....')).not.toBeInTheDocument();
	});
});
