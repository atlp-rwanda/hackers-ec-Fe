import { DynamicData } from '../../../@types/DynamicData';
import WishTableRow from '../../../pages/dashboard/seller/wishlist/WishTableRow';
import formatDate from '../../../utils/DateConversion';
import Pagination from '../../dashboard/buyer/Pagination';

interface WishTableProps {
	wishes: DynamicData[];
	pageCount: number;
	handlePageChange: (event: { selected: number }) => void;
}

const WishTable = ({ wishes, pageCount, handlePageChange }: WishTableProps) => {
	return (
		<>
			<div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-10 bg-neutral-white p-2 rounded-md max-w-[90%]">
				<div className="flex justify-between items-center">
					<h1 className="mb-5 text-lg">Wishlist</h1>
				</div>
				<table className="tables pt-2 p-3 overflow-hidden overflow-x-scroll max-w-[18rem] tablet:max-w-[100%]">
					<thead className="bg-[#256490] text-neutral-white text-left overflow-hidden rounded-3xl p2">
						<tr className="rounded-xl text-sm text-center">
							<th>No</th>
							<th>Image</th>
							<th>Name</th>
							<th>Quantity</th>
							<th>Discount</th>
							<th>Wish count</th>
							<th>Price</th>
							<th className="expand">Expiry date</th>
						</tr>
					</thead>
					<tbody className="text-slate-700">
						{wishes.map((wish: DynamicData, index: number) => (
							<WishTableRow
								key={index}
								wishes={wish}
								index={index}
								formatDate={formatDate}
							/>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-center">
				<Pagination pageCount={pageCount} onPageChange={handlePageChange} />
			</div>
		</>
	);
};

export default WishTable;
