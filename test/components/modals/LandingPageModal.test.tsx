import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPageModel from '../../../src/components/LandingPageModel';

describe('Open landing page modal', () => {
	it('should open model', () => {
		render(
			<MemoryRouter>
				<LandingPageModel
					openModel={true}
					toggleModel={() => console.log('Test')}
				/>
			</MemoryRouter>,
		);

		const searchInput = screen.getByPlaceholderText('Search ...');
		expect(searchInput).toBeInTheDocument();

		const navLinks = ['Home', 'Products', 'About', 'Contacts'];
		navLinks.forEach((linkText) => {
			const link = screen.getByText(linkText);
			expect(link).toBeInTheDocument();
		});
	});
});
