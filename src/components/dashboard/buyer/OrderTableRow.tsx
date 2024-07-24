import { BsThreeDotsVertical } from 'react-icons/bs';
import { DynamicData } from '../../../@types/DynamicData';
import {
	calculateTotalPrice,
	calculateTotalQuantity,
} from '../../../utils/orderCalculations';
import getStatusColor from '../../../utils/statusColor';
import { OrderModel } from '../../cards/orderModel';

interface OrderTableRowProps {
	item: DynamicData;
	idx: number;
	openModels: { [key: number]: boolean };
	toggleItemModel: (idx: number) => void;
}

const OrderTableRow = ({
	item,
	idx,
	openModels,
	toggleItemModel,
}: OrderTableRowProps) => {
	const firstOrderData = item.sales[0] || {};
	return (
		<tr
			key={idx}
			className={`relative text-sm ${idx % 2 !== 0 ? 'bg-[#DDD]' : ''}`}
		>
			<td className="text-sm font-bold">
				#{item?.id.length > 20 ? item.id?.slice(0, 5) : item.id}
			</td>
			<td>{new Date(item.createdAt).toLocaleDateString()}</td>
			<td>{new Date(firstOrderData?.deliveryDate).toLocaleDateString()}</td>
			<td>{calculateTotalQuantity(item.sales)}</td>
			<td>
				<span className="mr-1">{calculateTotalPrice(item.sales)}</span>
				RWF
			</td>
			<td>{item.sales.length || 0}</td>
			<td className={getStatusColor(item.status)}>{item.status}</td>
			<td className="cursor-pointer">
				<BsThreeDotsVertical
					onClick={() => toggleItemModel(idx)}
					aria-label="toggle_modal"
				/>
				{openModels[idx] && (
					<OrderModel
						id={item.id}
						idx={idx}
						item={item}
						state={item}
						handleToggle={toggleItemModel}
					/>
				)}
			</td>
		</tr>
	);
};

export default OrderTableRow;
