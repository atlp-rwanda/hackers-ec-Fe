import { render, screen } from '@testing-library/react';
import About from '../../src/pages/About';

describe('About Component', () => {
	it('renders the correct content', () => {
		render(<About />);
		expect(screen.getByText('About Us')).toBeInTheDocument();
	});
});
