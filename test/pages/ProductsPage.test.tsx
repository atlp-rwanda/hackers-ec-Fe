import {
	fireEvent,
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { jwtDecode } from 'jwt-decode';
import { http, HttpResponse } from 'msw';
import { DynamicData } from '../../src/@types/DynamicData';
import AllProvider from '../../src/AllProvider';
import LandingProduct from '../../src/pages/LandingProduct';
import ProductsPage from '../../src/pages/ProductsPage';
import fetchInfo from '../../src/utils/userDetails';
import { db } from '../mock/db';
import { localStorageMock } from '../mock/localStorage';
import { server } from '../mock/server';
import userEvent from '@testing-library/user-event';

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

global.URL.createObjectURL = vi.fn(() => 'mocked-url');
vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Products page components', () => {
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
				price: `10${item}`,
				discount: `1 ${item}`,
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

		return {
			name: screen.getAllByRole('progressbar'),
		};
	};

	it('should get all products and display them on the page', async () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		const result = fetchInfo();
		expect(result).toEqual(mockDecoded);
		expect(jwtDecode).toHaveBeenCalledWith(mockToken);

		const { name } = await renderComponent();

		const loader = screen.getByRole('progressbar');

		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();
		expect(name).toBeDefined();
	});

	it('it should display the minimum and maximum search fields', async () => {
		await renderComponent();
		const filterButton = screen.getByText(/Filters/i);
		fireEvent.click(filterButton);
		expect(
			await screen.findByPlaceholderText('Minimum price'),
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Maximum price')).toBeInTheDocument();
	});

	it('handles search input changes', async () => {
		render(
			<AllProvider>
				<ProductsPage />
			</AllProvider>,
		);

		const filterButton = screen.getByText(/Filters/i);
		const user = userEvent.setup();
		await user.click(filterButton);
		const minPriceInput = screen.getByPlaceholderText('Minimum price');
		const maxPriceInput = screen.getByPlaceholderText('Maximum price');

		await user.type(maxPriceInput, '5');
		await user.type(minPriceInput, '999999999999999');

		expect(maxPriceInput).toHaveValue(5);
		expect(minPriceInput).toHaveValue(999999999999999);
	});
});
