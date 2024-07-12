import { render, screen } from '@testing-library/react';
import AllProvider from '../../Utils/AllProvider';
import { DynamicData } from '../../../src/@types/DynamicData';
import { db } from '../../mock/db';
import WishListComp from '../../../src/components/wishes/WishListComp';
import userEvent from '@testing-library/user-event';
import { server } from '../../mock/server';
import { http, HttpResponse } from 'msw';
type wishType = {
	id: string;
	product?: DynamicData;
};
type product = {
	id: string;
	name: string;
};

vi.mock('../../../src/components/Deletemodal', () => ({
	__esModule: true,
	default: () => (
		<div>
			<p> Are you sure you want to delete this wish?</p>
		</div>
	),
}));

describe('review test', () => {
	const wishData: wishType[] = [];
	const productData: product[] = [];
	const setDeleteModal = vi.fn();
	beforeAll(() => {
		const prod = db.products.create({
			name: 'BMW SUV',
		});
		productData.push(prod);
		const wish = db.wishes.create({
			productId: '121212',
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
		render(
			<AllProvider>
				{' '}
				<WishListComp
					wishes={wishData}
					activeDeleteModal="121212"
					setActiveDeleteModal={setDeleteModal}
				/>{' '}
			</AllProvider>,
		);
	};
	it('should render wishlist', async () => {
		renderwishlistPage();
		const delModBut = screen.getByTestId('show-delete-modal');
		expect(delModBut).toBeInTheDocument();
		await userEvent.click(delModBut);
		expect(
			screen.getByText(/Are you sure you want to delete this wish?/i),
		).toBeInTheDocument();
	});
});
