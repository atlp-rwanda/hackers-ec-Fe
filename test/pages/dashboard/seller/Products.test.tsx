import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Products from '../../../../src/pages/dashboard/seller/Products';
import { BrowserRouter } from 'react-router-dom';

describe('Products page component', () => {
	it('should render a product page compoent with its title and an add new product button', () => {
		render(<Products />, { wrapper: BrowserRouter });
		expect(screen.getByText(/products page/i)).toBeInTheDocument();
	});
});
