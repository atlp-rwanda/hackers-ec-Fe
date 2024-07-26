import {
	render,
	screen,
	waitForElementToBeRemoved,
	waitFor,
} from '@testing-library/react';
import CategoriesPage from '../../../../../src/pages/dashboard/seller/categories/CategoriesPage';
import AllProvider from '../../../../Utils/AllProvider';
import { db } from '../../../../mock/db';
import { server } from '../../../../mock/server';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import { store } from '../../../../../src/redux/store';

type CategoryType = {
	id: string;
	name: string;
};
describe('Get all categories', () => {
	const categories: CategoryType[] = [];
	beforeAll(() => {
		[1, 2, 3].map((item) => {
			const category = db.categories.create({
				name: `Category ${item}`,
				description: `This is the category number ${item}`,
				products: [],
			});
			categories.push(category);
		});
	});

	const renderComponent = async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/categories`, () =>
				HttpResponse.json({
					data: categories,
				}),
			),
		);
		render(
			<AllProvider>
				<CategoriesPage />
			</AllProvider>,
		);

		const loader = screen.getByRole('progressbar');
		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();

		return {
			addButton: screen.getByText('Add new'),
		};
	};

	it('It should display all categories', async () => {
		const dispatchSpy = vi.spyOn(store, 'dispatch');
		const { addButton } = await renderComponent();
		const user = userEvent.setup();
		await user.click(addButton);
		const name = screen.getByPlaceholderText(/Category name/i);
		const description = screen.getByPlaceholderText(/Category description/i);
		const button = screen.getByRole('button', { name: 'Add' });
		expect(name).toBeInTheDocument();
		expect(description).toBeInTheDocument();

		await user.type(name, 'my category');
		await user.type(description, 'this is description');
		await user.click(button);
		await waitFor(() => {
			expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
		});
	});
});
