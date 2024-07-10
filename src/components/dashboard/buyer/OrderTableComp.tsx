import { DynamicData } from '../../../@types/DynamicData';
import OrderTableRow from './OrderTableRow';
import Pagination from './Pagination';

interface OrderTableCompProps {
	orders: DynamicData[];
	openModels: { [key: number]: boolean };
	toggleItemModel: (idx: number) => void;
	pageCount: number;
	handlePageClick: (event: { selected: number }) => void;
}

const OrderTableComp = ({
	orders,
	openModels,
	toggleItemModel,
	pageCount,
	handlePageClick,
}: OrderTableCompProps) => {
	return (
		<div className="bg-neutral-white rounded-xl _shadow p-5 laptop:w-[90%] laptop:mx-auto">
			<h1 className="text-xl mb-4 mt-2 font-semibold">My Orders</h1>
			<>
				<div className="tableWrapper mt-1 text-[1rem] rounded-md">
					<table className="tables pt-2 px-0 overflow-hidden overflow-x-scroll text-center">
						<thead className="bg-[#256490] text-neutral-white text-left overflow-hidden rounded-3xl p2">
							<tr className="rounded-xl text-sm ipad:text-base text-center">
								<th>Order Id</th>
								<th>Order Date</th>
								<th>Delivery Date</th>
								<th>Total Quantity</th>
								<th>Total Price</th>
								<th>Items</th>
								<th>Status</th>
								<th className="expand">Action</th>
							</tr>
						</thead>
						<tbody className="text-slate-700">
							{orders.map((item: DynamicData, idx: number) => (
								<OrderTableRow
									key={idx}
									item={item}
									idx={idx}
									openModels={openModels}
									toggleItemModel={toggleItemModel}
								/>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex items-center justify-center">
					<Pagination pageCount={pageCount} onPageChange={handlePageClick} />
				</div>
			</>
		</div>
	);
};

export default OrderTableComp;
