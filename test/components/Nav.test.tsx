import Nav from '../../src/components/Nav';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { localStorageMock } from '../mock/localStorage';
import AllProvider from '../Utils/AllProvider';
import { jwtDecode } from 'jwt-decode';
import { DynamicData } from '../../src/@types/DynamicData';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Nav Component', () => {
	const renderComponent = () => {
		render(<Nav />, { wrapper: AllProvider });
	};
	it('renders the Home link', () => {
		renderComponent();

		expect(screen.getByText('Home')).toBeInTheDocument();
	});

	it('renders the About link', () => {
		renderComponent();
		expect(screen.getByText('About Us')).toBeInTheDocument();
	});

	it('should show the notification bell and profile image', () => {
		const mockToken = 'valid-token';
		localStorage.setItem('access_token', mockToken);
		const mockDecoded = { id: 1, role: 'BUYER' };

		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);
		renderComponent();

		expect(screen.getByLabelText('bell-image')).toBeInTheDocument();
	});
});
