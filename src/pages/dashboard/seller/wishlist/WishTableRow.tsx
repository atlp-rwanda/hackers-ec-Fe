import React from 'react';
import { DynamicData } from '../../../../@types/DynamicData';

interface SalesTableRowProps {
	wishes: DynamicData;
	index: number;
	formatDate: (dateString: string) => string;
}

const WishTableRow: React.FC<SalesTableRowProps> = ({
	wishes,
	index,
	formatDate,
}) => {
	return (
		<tr
			key={index}
			className={`hover:bg-primary-lightblue/30 text-center relative text-sm ${index % 2 !== 0 ? 'bg-[#DDDD]' : ''}`}
		>
			<td>{index}</td>
			<td className="w-20 h-16">
				<img
					src={wishes.product.images[0]}
					alt="product_images"
					className="w-full h-full object-cover rounded-lg"
				/>
			</td>
			<td>
				{wishes.product.name.length > 15
					? `${wishes.product.name.substring(0, 15)}...`
					: wishes.product.name}
			</td>
			<td>{wishes.product.quantity}</td>
			<td>{wishes.product.discount}</td>
			<td>{wishes.numberOfUserWishProduct}</td>
			<td>{wishes.product.price} RWF</td>
			<td>{formatDate(wishes.product.expiryDate)}</td>
		</tr>
	);
};

export default WishTableRow;
