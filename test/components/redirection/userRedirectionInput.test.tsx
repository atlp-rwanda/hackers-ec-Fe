import SuccessPageInput from '../../../src/components/Redirection/userRedirectionInput';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { store } from '../../../src/redux/store';

describe('SuccessPageInput', () => {
	it('renders without crashing', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SuccessPageInput text={'test'} />
				</BrowserRouter>
			</Provider>,
		);
	});

	it('displays the correct text', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SuccessPageInput text={'test'} />
				</BrowserRouter>
			</Provider>,
		);

		expect(screen.getByText('test')).toBeInTheDocument();
	});
});
