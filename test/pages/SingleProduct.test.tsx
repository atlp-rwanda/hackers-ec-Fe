import { screen, render } from '@testing-library/react';
import SingleProduct from '../../src/pages/SingleProduct';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { MemoryRouter } from 'react-router-dom';

describe('Single product component', () => {
	it('renders the single product component', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SingleProduct />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByText('Quantity')).toBeInTheDocument();
	});
});
