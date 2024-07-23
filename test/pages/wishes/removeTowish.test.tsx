import { render, screen } from '@testing-library/react';
import AllProvider from '../../Utils/AllProvider';
import AddToWish from '../../../src/components/wishes/AddToWish';
import userEvent from '@testing-library/user-event';
import { server } from '../../mock/server';
import { http, HttpResponse } from 'msw';
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

const showSuccessMessageMock = vi.fn();
const showErrorMessageMock = vi.fn();

vi.mock('../../../src/hooks/useToast', () => ({
	__esModule: true,
	default: () => ({
		showSuccessMessage: showSuccessMessageMock,
		showErrorMessage: showErrorMessageMock,
	}),
}));
vi.mock('../../../src/hooks/usePagination', () => ({
	__esModule: true,
	default: () => ({
		currentItems: [
			{
				product: {
					id: '34093853',
					name: 'BMW',
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
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/wishes`, () => {
				return HttpResponse.json({
					data: wishData,
				});
			}),
		);
		server.use(
			http.post(`${import.meta.env.VITE_API_BASE_URL}/wishes`, () => {
				return HttpResponse.json({
					data: {},
				});
			}),
		);

		render(
			<AllProvider>
				{' '}
				<AddToWish productId="" btnCss="" />{' '}
			</AllProvider>,
		);
	};

	it('should remove to wishlist', async () => {
		renderwishlistPage();
		vi.mock('../../../src/hooks/useCheckWishlist', () => ({
			__esModule: true,
			default: () => ({ wished: false, setWished: vi.fn() }),
		}));
		const addButton = screen.getByTestId('addTowishlist');
		expect(addButton).toBeInTheDocument();
		await userEvent.click(addButton);
		expect(showSuccessMessageMock).toHaveBeenCalled();
	});
});
