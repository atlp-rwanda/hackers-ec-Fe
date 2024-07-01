import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, expect, describe } from 'vitest';
import ErrorPage from '../../src/pages/ErrorPage';

describe('NotFound page', () => {
	it('should render a Error page', () => {
		render(
			<MemoryRouter>
				<ErrorPage />
			</MemoryRouter>,
		);

		expect(screen.getByText(/Something went wrong/i));
	});
});
