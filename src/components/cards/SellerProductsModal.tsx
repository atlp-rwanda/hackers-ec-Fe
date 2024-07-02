import { ShoppingBasket } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface SellerModalProps {
	id: string;
	idx: number;
	handleToggle: (idx: number) => void;
}

export const SellerProductsModal = ({
	id,
	idx,
	handleToggle,
}: SellerModalProps) => {
	return (
		<div className="absolute desktop:w-[15%] right-2 laptop:right-6 z-50 -top-10 flex p-2 rounded-lg shadow-md bg-[#fcfdfe] _shadow pt-5 pl-5">
			<div className="flex flex-col justify-between relative w-full">
				<div className="view_product flex gap-2 text-sm rounded-md p-1 a_link">
					<Link to={`/dashboard/products/${id}`} className="flex gap-2">
						<ShoppingBasket className="text-sm" /> Preview
					</Link>
				</div>
				<div className="edit_product flex gap-2 text-sm rounded-md p-1 a_link">
					<FaEdit className="text-xl" /> Edit product
				</div>
				<div className="delete_product flex gap-2 text-sm rounded-md p-1 a_link ">
					<MdDelete className="text-xl text-action-error" /> Delete product
				</div>
				<IoClose
					className="absolute -right-2 -top-4 rounded-full bg-action-error  text-2xl"
					onClick={() => handleToggle(idx)}
				/>
			</div>
		</div>
	);
};
