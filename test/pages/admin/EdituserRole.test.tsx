import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { describe, expect } from 'vitest';
import EditUserForm from '../../../src/components/Forms/editUserForm';
import GetUser from '../../../src/components/adminDashboard/getUser';
import EditUser from '../../../src/pages/Admin/EditUserRoles';
import AllProvider from '../../../src/utils/AllProvider';
import { db } from '../../mock/db';
import { server } from '../../mock/server';
type userTYpe = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	Active: string;
	role: string;
};

type roleType = {
	id: string;
	roleName: string;
};

describe('Dashboard Edit role page', () => {
	const userData: userTYpe[] = [];
	const roleData: roleType[] = [];

	beforeAll(() => {
		[1].map(() => {
			const role = db.roles.create({ roleName: 'ADMIN' });
			const roleSeller = db.roles.create({ roleName: 'SELLER' });
			roleData.push(role);
			roleData.push(roleSeller);
		});
		[1].map((item) => {
			const users = db.users.create({
				firstName: 'kabera',
				lastName: 'joe',
				email: `johndoe${item}@example.com`,
				role: `${roleData[0].id}`,
				Active: 'Active',
			});
			userData.push(users);
		});
	});

	afterAll(() => {
		const userIds = userData.map((item) => item.id);
		const roleIds = roleData.map((item) => item.id);
		db.roles.deleteMany({ where: { id: { in: roleIds } } });
		db.users.deleteMany({ where: { id: { in: userIds } } });
	});

	const renderEditusePage = async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/roles`, () => {
				return HttpResponse.json({
					data: roleData,
				});
			}),
		);
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/users`, () => {
				return HttpResponse.json({
					data: userData,
				});
			}),
		);
		render(
			<AllProvider>
				<EditUser />
			</AllProvider>,
		);
		const loader = screen.getByTestId('role-form-loader');
		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();
	};

	const renderComponent = async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/roles`, () => {
				return HttpResponse.json({
					data: roleData,
				});
			}),
		);
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/users`, () => {
				return HttpResponse.json({
					data: userData,
				});
			}),
		);
		const user = userData.map((item) => item.id);
		render(
			<AllProvider>
				<div className="content  relative h-full ipad:pl-0 w-full">
					<GetUser />
					<EditUserForm id={user[0]} />
				</div>
			</AllProvider>,
		);
		const loader = screen.getByTestId('role-form-loader');
		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();
	};
	test('it should test edit role page of user', async () => {
		await renderEditusePage();
		const firstName = screen.getByText(/kabera/i);
		const lastName = screen.getByText(/joe/i);
		const email = screen.getByText(/johndoe1@example.com/i);
		expect(firstName).toBeInTheDocument();
		expect(lastName).toBeInTheDocument();
		expect(email).toBeInTheDocument();
		const backButton = screen.getByRole('button', { name: /back/i });
		expect(backButton).toBeInTheDocument();

		const editUsersHeader = screen.getByText(/edit users/i);
		expect(editUsersHeader).toBeInTheDocument();

		const roleLabel = screen.getByLabelText(/update role/i);
		expect(roleLabel).toBeInTheDocument();

		const roleSelect = screen.getByRole('combobox', { name: /update role/i });
		expect(roleSelect).toBeInTheDocument();

		const selectElm = screen.getByDisplayValue(/select-role/i);
		expect(selectElm).toBeInTheDocument();

		const updateButton = screen.getByRole('button', { name: /update/i });
		expect(updateButton).toBeInTheDocument();
	});
	test('it should render role form', async () => {
		await renderComponent();

		const backButton = screen.getByRole('button', { name: /back/i });
		expect(backButton).toBeInTheDocument();

		const editUsersHeader = screen.getByText(/edit users/i);
		expect(editUsersHeader).toBeInTheDocument();

		const roleLabel = screen.getByLabelText(/update role/i);
		expect(roleLabel).toBeInTheDocument();

		const roleSelect = screen.getByRole('combobox', { name: /update role/i });
		expect(roleSelect).toBeInTheDocument();

		const selectElm = screen.getByDisplayValue(/select-role/i);
		expect(selectElm).toBeInTheDocument();

		const updateButton = screen.getByRole('button', { name: /update/i });
		expect(updateButton).toBeInTheDocument();
	});
	test('it should select an admin in select', async () => {
		await renderComponent();
		const roleSelect = screen.getByRole('combobox', { name: /update role/i });
		await userEvent.selectOptions(roleSelect, ['ADMIN']);
		const selectedItem = screen.getByRole<HTMLOptionElement>('option', {
			name: 'ADMIN',
		});
		expect(selectedItem.selected).toBe(true);
	});
	test('it should validate the select options an warn admin to select roles', async () => {
		await renderComponent();
		const updateButton = screen.getByRole('button', { name: /update/i });
		expect(updateButton).toBeInTheDocument();
		await userEvent.click(updateButton);
		expect(screen.getByText(/Role is required/i)).toBeInTheDocument();
	});
	test('it should change  the role of user ', async () => {
		await renderComponent();
		const roleSelect = screen.getByRole('combobox', { name: /update role/i });
		await userEvent.selectOptions(roleSelect, ['SELLER']);

		const selectedItem = screen.getByRole<HTMLOptionElement>('option', {
			name: 'SELLER',
		});
		expect(selectedItem.selected).toBe(true);
		const updateButton = screen.getByRole('button', { name: /update/i });
		expect(updateButton).toBeInTheDocument();
		await userEvent.click(updateButton);
		expect(screen.getByText(/SELLER/i)).toBeInTheDocument();
	});
});
