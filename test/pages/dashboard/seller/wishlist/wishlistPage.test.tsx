import { render } from '@testing-library/react';
import WishlistPage from '../../../../../src/pages/dashboard/seller/wishlist/wishlistPage';
import AllProvider from '../../../../Utils/AllProvider';

describe('wishlist Page', () => {
	it('should render the wishlist page', () => {
		render(
			<AllProvider>
				<WishlistPage />
			</AllProvider>,
		);
	});
});
