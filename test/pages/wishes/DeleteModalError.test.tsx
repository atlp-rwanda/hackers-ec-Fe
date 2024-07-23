import { render, screen } from '@testing-library/react';
import AllProvider from '../../Utils/AllProvider';
import userEvent from '@testing-library/user-event';
import { server } from '../../mock/server';
import { http, HttpResponse } from 'msw';
import { DynamicData } from '../../../src/@types/DynamicData';
import { db } from '../../mock/db';
import DeleteModal from '../../../src/components/Deletemodal';
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
				return new HttpResponse(null, { status: 403 });
			}),
		);

		render(
			<AllProvider>
				{' '}
				<DeleteModal productId="" setDeleteModal={setDeleteModal} />{' '}
			</AllProvider>,
		);
	};
	it('should  delete modal wishlist', async () => {
		renderwishlistPage();
		expect(screen.getByText(/Delete Wishes/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Are you sure you want to delete this wish/i),
		).toBeInTheDocument();
		const confirmBut = screen.getByRole('button', { name: "Yes, I'm sure" });
		expect(confirmBut).toBeInTheDocument();
		const canceclBut = screen.getByRole('button', { name: 'No, cancel' });
		expect(canceclBut).toBeInTheDocument();
		await userEvent.click(confirmBut);
		expect(showErrorMessageMock).toHaveBeenCalled();
		await userEvent.click(canceclBut);
		expect(setDeleteModal).toHaveBeenCalled();
	});
});
