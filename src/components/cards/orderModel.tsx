import { ShoppingBasket } from 'lucide-react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { DynamicData } from '../../@types/DynamicData';

interface OrderModalProps {
	id: string;
	idx: number;
	item: DynamicData;
	state: DynamicData;
	handleToggle: (idx: number) => void;
}

export const OrderModel = ({ id, idx, handleToggle }: OrderModalProps) => {
	return (
		<div className="absolute pt-6 pb-3 pl-4 pr-4 desktop:w-[15%] right-2 laptop:right-6 laptop:pr-4 laptop:pt-6 z-50 -top-10 flex p-2 rounded-lg shadow-md bg-[#fcfdfe] _shadow">
			<div className="flex flex-col justify-between relative w-full">
				<div className="view_product flex justify-center gap-2 text-sm rounded-md p-1 a_link mt-5 mb-3">
					<Link to={`/orders/${id}`} className="flex items-center gap-2">
						<ShoppingBasket className="text-sm text-center" /> View More
					</Link>
				</div>
				<IoClose
					className="absolute -right-2 -top-4 rounded-full bg-action-error text-2xl"
					onClick={() => handleToggle(idx)}
				/>
			</div>
		</div>
	);
};
