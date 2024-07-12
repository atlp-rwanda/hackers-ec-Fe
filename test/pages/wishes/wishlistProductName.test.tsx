import {
	render,
	screen,
	//	waitForElementToBeRemoved,
} from '@testing-library/react';

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

vi.mock('../../../src/hooks/useWishlist', () => ({
	__esModule: true,
	default: () => ({ isLoading: true, data: {} }),
}));
vi.mock('../../../src/hooks/usePagination', () => ({
	__esModule: true,
	default: () => ({
		currentItems: [
			{
				product: {
					id: '34093853',
					name: 'BMW Ferrari Audi Ranger Rover Country',
					images: ['https://o'],
					price: 3000434,
				},
			},
		],
		pageCount: 1,
		handlePageClick: () => {},
		isLoading: false,
	}),
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
		expect(screen.getByText(/Favorite Products/i)).toBeDefined();
		expect(screen.getByText(/BMW Ferrari Audi Ran.../i)).toBeDefined();
		expect(screen.getByText(/3000434/i)).toBeDefined();
	});
});
