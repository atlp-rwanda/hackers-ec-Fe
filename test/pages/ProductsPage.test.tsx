import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import LandingProduct from '../../src/pages/LandingProduct';
import { db } from '../mock/db';
import { server } from '../mock/server';
import AllProvider from '../../src/AllProvider';
import { http, HttpResponse } from 'msw';
import ProductsPage from '../../src/pages/ProductsPage';

type ProductType = {
	id: string;
	name: string;
	price: string;
	discount: string;
	category: string;
	expiryDate: string;
	status: string;
	images: string;
};

global.URL.createObjectURL = vi.fn(() => 'mocked-url');

describe('Landing page products components', () => {
	it('render the correct content', () => {
		render(
			<AllProvider>
				<LandingProduct />
			</AllProvider>,
		);
	});
});

describe('Get all products', () => {
	const products: ProductType[] = [];

	beforeAll(() => {
		[1, 2, 3, 4, 5, 6, 7].map((item) => {
			const product = db.products.create({
				name: `Iphone ${item}`,
				price: `1000000 ${item}`,
				discount: `10 ${item}`,
			});
			products.push(product);
		});
	});

	afterAll(() => {
		const productId = products?.map((product) => product.id);
		db.products.deleteMany({ where: { id: { in: productId } } });
	});

	const renderComponent = async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, () =>
				HttpResponse.json({
					data: products,
				}),
			),
		);

		render(
			<AllProvider>
				<ProductsPage />
			</AllProvider>,
		);

		const loader = screen.getByRole('progressbar');

		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();

		return {
			name: screen.getAllByRole('heading'),
		};
	};

	it('should render a loader on the page while fetching products', () => {
		render(
			<AllProvider>
				<LandingProduct />
			</AllProvider>,
		);
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	it('should get all products and display them on the page', async () => {
		const { name } = await renderComponent();

		expect(name).toBeDefined();
	});
});
