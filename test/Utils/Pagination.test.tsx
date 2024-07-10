import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../../src/utils/Pagination';

describe('Pagination', () => {
	it('renders correctly', () => {
		const onPageChange = vi.fn();
		render(
			<Pagination pageCount={10} currentPage={0} onPageChange={onPageChange} />,
		);

		expect(screen.getByRole('navigation')).toBeDefined();
	});

	it('calls onPageChange when a page is clicked', () => {
		const onPageChange = vi.fn();
		render(
			<Pagination pageCount={10} currentPage={0} onPageChange={onPageChange} />,
		);

		fireEvent.click(screen.getByText('2'));
		expect(onPageChange).toHaveBeenCalledWith(1);
	});

	it('disables previous button on first page', () => {
		const onPageChange = vi.fn();
		render(
			<Pagination pageCount={10} currentPage={0} onPageChange={onPageChange} />,
		);

		const prevButton = screen.getByLabelText('Previous page');
		expect(prevButton).toHaveAttribute('aria-disabled', 'true');
		expect(prevButton).toHaveAttribute('tabindex', '-1');
	});

	it('disables next button on last page', () => {
		const onPageChange = vi.fn();
		render(
			<Pagination pageCount={10} currentPage={9} onPageChange={onPageChange} />,
		);

		const nextButton = screen.getByLabelText('Next page');
		expect(nextButton).toHaveAttribute('aria-disabled', 'true');
		expect(nextButton).toHaveAttribute('tabindex', '-1');
	});
});
