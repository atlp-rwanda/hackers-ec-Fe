import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../../../../../src/components/dashboard/buyer/Pagination';

vi.mock('react-icons/gr', () => ({
	GrNext: () => <div data-testid="gr-next" />,
	GrPrevious: () => <div data-testid="gr-previous" />,
}));

describe('Pagination component', () => {
	const mockOnPageChange = vi.fn();

	const renderWithProps = (pageCount: number) => {
		return render(
			<Pagination pageCount={pageCount} onPageChange={mockOnPageChange} />,
		);
	};

	it('should render the component with next and previous buttons', () => {
		renderWithProps(10);

		expect(screen.getByTestId('gr-next')).toBeInTheDocument();
		expect(screen.getByTestId('gr-previous')).toBeInTheDocument();
	});

	it('should call onPageChange when a page is clicked', () => {
		renderWithProps(10);

		const secondPage = screen.getByText('2');
		fireEvent.click(secondPage);

		expect(mockOnPageChange).toHaveBeenCalledWith({ selected: 1 });
	});

	it('should render the correct number of pages', () => {
		renderWithProps(10);
		const pageNumbers = screen.getAllByRole('button');
		expect(pageNumbers).toHaveLength(10);
	});
});
