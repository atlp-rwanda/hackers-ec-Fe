import { render, screen } from '@testing-library/react';
import AllProvider from '../../../../src/AllProvider';
import SellerProductsPage from '../../../../src/pages/dashboard/seller/SellerProductsPage';
import { db } from '../../../mock/db';

type ProductType = {
	id: string;
	name: string;
	price: string;
};

global.URL.createObjectURL = vi.fn(() => 'mocked-url');

describe('Landing page products components', () => {
	it('renders without crashing', () => {
		render(
			<AllProvider>
				<SellerProductsPage />
			</AllProvider>,
		);
	});
});

describe('Get all products', () => {
	const products: ProductType[] = [];

	beforeAll(() => {
		[1].forEach((item) => {
			const product = db.products.create({
				name: `Iphone ${item}`,
				price: `1200000 ${item}`,
			});
			products.push(product);
		});
	});

	afterAll(() => {
		const productIds = products.map((product) => product.id);
		db.products.deleteMany({ where: { id: { in: productIds } } });
	});

	it('renders a loader while fetching products', () => {
		render(
			<AllProvider>
				<SellerProductsPage />
			</AllProvider>,
		);
		expect(screen.getByText(/found/i)).toBeInTheDocument();
	});

	it('fetches and displays all products', async () => {
		render(
			<AllProvider>
				<SellerProductsPage />
			</AllProvider>,
		);
		const button = screen.getByText(/add/i);
		expect(button).toBeInTheDocument();
	});
});
