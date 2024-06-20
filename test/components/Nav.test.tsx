import Nav from '../../src/components/Nav';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { store } from '../../src/redux/store';

describe('Nav Component', () => {
	it('renders the Home link', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Nav />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByText('Home')).toBeInTheDocument();
	});

	it('renders the About link', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Nav />
				</MemoryRouter>
			</Provider>,
		);
		expect(screen.getByText('About Us')).toBeInTheDocument();
	});
});
