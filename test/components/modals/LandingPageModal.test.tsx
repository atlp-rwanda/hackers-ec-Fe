import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
import LandingPageModel from '../../../src/components/LandingPageModel';
import AllProvider from '../../Utils/AllProvider';
import userEvent from '@testing-library/user-event';

describe('Open landing page modal', () => {
	it('should open model', async () => {
		render(
			<AllProvider>
=======
import { MemoryRouter } from 'react-router-dom';
import LandingPageModel from '../../../src/components/LandingPageModel';

describe('Open landing page modal', () => {
	it('should open model', () => {
		render(
			<MemoryRouter>
>>>>>>> fce9eae (feat(Register): Users should be able Signup/Register to the E-commerce App)
				<LandingPageModel
					openModel={true}
					toggleModel={() => console.log('Test')}
				/>
<<<<<<< HEAD
			</AllProvider>,
		);

		const searchInput = screen.getByPlaceholderText('Search ...');
		const user = userEvent.setup();
		await user.type(searchInput, 'product');
=======
			</MemoryRouter>,
		);

		const searchInput = screen.getByPlaceholderText('Search ...');
>>>>>>> fce9eae (feat(Register): Users should be able Signup/Register to the E-commerce App)
		expect(searchInput).toBeInTheDocument();

		const navLinks = ['Home', 'Products', 'About', 'Contacts'];
		navLinks.forEach((linkText) => {
			const link = screen.getByText(linkText);
			expect(link).toBeInTheDocument();
		});
<<<<<<< HEAD
		expect(searchInput).toHaveValue('product');
		expect(searchInput).toBeInTheDocument();
=======
>>>>>>> fce9eae (feat(Register): Users should be able Signup/Register to the E-commerce App)
	});
});
