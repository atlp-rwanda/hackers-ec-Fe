import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LoginForm from '../../../src/components/auth/LoginForm';
import { store } from '../../../src/redux/store';

describe('LoginForm component', () => {
	it('should render a login form', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<LoginForm />
				</BrowserRouter>
			</Provider>,
		);

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const loginButton = screen.getByText('Login');

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});
});
