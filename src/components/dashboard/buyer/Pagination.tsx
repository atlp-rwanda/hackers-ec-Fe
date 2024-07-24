import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';

interface paginationProps {
	pageCount: number;
	onPageChange: (event: { selected: number }) => void;
}
const Pagination = ({ pageCount, onPageChange }: paginationProps) => {
	return (
		<div className="flex items-center justify-center">
			<ReactPaginate
				previousLabel={<GrPrevious />}
				nextLabel={<GrNext />}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={onPageChange}
				containerClassName={'pagination'}
				activeClassName={'active'}
			/>
		</div>
	);
};

export default Pagination;
