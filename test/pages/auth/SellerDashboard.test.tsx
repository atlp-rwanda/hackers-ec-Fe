import { render } from '@testing-library/react';
import SellerDashboard from '../../../src/pages/SellerDashboard';

describe('SellerDashboard component', () => {
	it('render the correct content', () => {
		render(<SellerDashboard />);
	});

	it('render seller dashboard correctly', () => {
		const { container } = render(<SellerDashboard />);
		expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex-center h-screen text-7xl"
              >
                Seller Dashboard
              </div>
            </div>
        `);
	});

	it('should contain word seller dashboard', () => {
		const { container } = render(<SellerDashboard />);
		expect(container.textContent).toContain('Seller Dashboard');
	});
});
