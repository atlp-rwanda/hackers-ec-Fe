import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import BackButton from '../../../src/components/buttons/BackButton';
const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockUseNavigate,
	};
});

describe('BackButton component', () => {
	it('should render a back button', () => {
		render(<BackButton isBordered title="Back" />, {
			wrapper: BrowserRouter,
		});

		const button = screen.getByRole('button', { name: /back/i });
		expect(button).toBeInTheDocument();
	});

	it('should navigate to the provided URL when clicked', () => {
		render(<BackButton url="/test-url" isBordered title="Back" />, {
			wrapper: BrowserRouter,
		});

		const button = screen.getByRole('button', { name: /back/i });
		fireEvent.click(button);

		expect(mockUseNavigate).toHaveBeenCalledWith('/test-url');
	});

	it('should navigate to the default URL ("/") when no URL is provided', () => {
		render(<BackButton isBordered title="Back" />, {
			wrapper: BrowserRouter,
		});

		const button = screen.getByRole('button', { name: /back/i });
		fireEvent.click(button);

		expect(mockUseNavigate).toHaveBeenCalledWith('/');
	});
});
