import { render, screen } from '@testing-library/react';

import Wishlist from '../../../src/pages/Wishlist';
import AllProvider from '../../Utils/AllProvider';

vi.mock('../../../src/hooks/useWishlist', () => ({
	__esModule: true,
	default: () => ({ isLoading: true, data: {} }),
}));
vi.mock('../../../src/hooks/usePagination', () => ({
	__esModule: true,
	default: () => ({
		currentItems: [],
		pageCount: 1,
		handlePageClick: () => {},
		isLoading: false,
	}),
}));
describe('review test', () => {
	const renderwishlistPage = async () => {
		render(
			<AllProvider>
				{' '}
				<Wishlist />{' '}
			</AllProvider>,
		);
	};
	it('should render wishlist', () => {
		renderwishlistPage();
		expect(screen.getByText(/Your wishlist is currently empty/i)).toBeDefined();
		expect(
			screen.getByText(/Start adding some items to see them here/i),
		).toBeDefined();
	});
});
