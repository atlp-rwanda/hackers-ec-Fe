import { render, screen, waitFor } from '@testing-library/react';
import CategoriesForm from '../../../../../src/pages/dashboard/seller/categories/CategoriesForm';
import { server } from '../../../../mock/server';
import { http, HttpResponse } from 'msw';
import AllProvider from '../../../../Utils/AllProvider';
import { store } from '../../../../../src/redux/store';
import userEvent from '@testing-library/user-event';

describe('category form', () => {
	const categoryData = {
		name: 'First category',
		description: 'This is the description',
		id: 'a64aeab5-eaa1-48f4-9e52-8a0924a0490a',
	};
	const onClose = vi.fn();
	const renderComponent = async () => {
		server.use(
			http.patch(`${import.meta.env.VITE_API_BASE_URL}/categories`, () =>
				HttpResponse.json({
					data: {},
				}),
			),
		);
		render(
			<AllProvider>
				<CategoriesForm categoryData={categoryData} onClose={onClose} />
			</AllProvider>,
		);
		return {
			updateButton: screen.getByText('Update'),
		};
	};
	it('It should display categories form', async () => {
		const dispatchSpy = vi.spyOn(store, 'dispatch');
		const { updateButton } = await renderComponent();
		expect(updateButton).toBeInTheDocument();
		const user = userEvent.setup();
		await user.click(updateButton);
		await waitFor(() => {
			expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
		});
	});
});
