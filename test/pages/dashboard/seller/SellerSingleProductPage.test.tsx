import { render, screen } from '@testing-library/react';
import SellerSingleProduct from '../../../../src/pages/dashboard/seller/SellerSingleProduct';
import AllProvider from '../../../Utils/AllProvider';

describe('Landing page products components', () => {
	it('renders without crashing', () => {
		render(
			<AllProvider>
				<SellerSingleProduct />
			</AllProvider>,
		);

		expect(screen.getByText('Product Details')).toBeInTheDocument();
	});
});
