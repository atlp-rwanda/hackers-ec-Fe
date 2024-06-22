import { screen, render } from '@testing-library/react';
import {
	AddProduct,
	DashboardContent,
	DashboardProducts,
	DashboardSingleProducts,
} from '../../../../src/utils/DashboardUtils';
import { localStorageMock } from '../../../mock/localStorage';
import { jwtDecode } from 'jwt-decode';
import { DynamicData } from '../../../../src/@types/DynamicData';
import AllProvider from '../../../Utils/AllProvider';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('group', () => {
	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardProducts />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.getByText(/Hello Admin/i)).toBeInTheDocument();
	});
	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.getByText(/Hello Seller/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardProducts />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardSingleProducts />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardSingleProducts />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardSingleProducts />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<AddProduct />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});
});
