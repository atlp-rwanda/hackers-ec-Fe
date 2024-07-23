import { render, screen } from '@testing-library/react';

import Wishlist from '../../../src/pages/Wishlist';
import AllProvider from '../../Utils/AllProvider';
import { DynamicData } from '../../../src/@types/DynamicData';
import { db } from '../../mock/db';

type wishType = {
	id: string;
	product?: DynamicData;
};
type product = {
	id: string;
	name: string;
};
vi.mock('../../../src/utils/userDetails', () => ({
	__esModule: true,
	default: () => ({ data: {} }),
}));

describe('review test', () => {
	const wishData: wishType[] = [];
	const productData: product[] = [];
	beforeAll(() => {
		const prod = db.products.create({
			name: 'BMW SUV',
		});
		productData.push(prod);
		const wish = db.wishes.create({
			product: prod,
		});
		wishData.push(wish);
	});

	afterAll(() => {
		const wishIds = wishData.map((item) => item.id);
		db.wishes.deleteMany({ where: { id: { in: wishIds } } });
		const proIds = productData.map((item) => item.id);
		db.products.deleteMany({ where: { id: { in: proIds } } });
	});

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
		screen.debug(undefined, 1000000);
		const loader = screen.getByRole('progressbar');
		expect(loader).toBeInTheDocument();
		expect(screen.getByText(/Please wait/i)).toBeDefined();
	});
});
