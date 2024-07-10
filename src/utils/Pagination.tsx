import React from 'react';
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from 'react-icons/gr';

interface PaginationProps {
	pageCount: number;
	currentPage: number;
	onPageChange: (selected: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	pageCount,
	currentPage,
	onPageChange,
}) => {
	const handlePageClick = (data: { selected: number }) => {
		onPageChange(data.selected);
	};

	return (
		<div data-testid="pagination-component">
			<ReactPaginate
				previousLabel={<GrPrevious />}
				nextLabel={<GrNext />}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={'pagination'}
				activeClassName={'active'}
				forcePage={currentPage}
			/>
		</div>
	);
};

export default Pagination;
