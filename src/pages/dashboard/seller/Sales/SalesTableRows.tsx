import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { openModal } from '../../../../redux/features/Sales/AllSaleSlice';
import { useNavigate } from 'react-router-dom';
import { DynamicData } from '../../../../@types/DynamicData';

interface SalesTableRowProps {
	sale: DynamicData;
	index: number;
	formatDate: (dateString: string) => string;
	getStatusClass: (status: string) => string;
}

const SalesTableRow: React.FC<SalesTableRowProps> = ({
	sale,
	index,
	formatDate,
	getStatusClass,
}) => {
	const dispatch = useAppDispatch();
	const { isModalOpen, selectedSaleId } = useAppSelector(
		(state) => state.sales,
	);

	const navigate = useNavigate();

	const handleRowClick = () => {
		navigate(`${sale.id}`);
	};

	const handleThreeDotClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(
			openModal({
				id: sale.id,
				status: sale.status,
				productImage: sale.soldProducts.images[0],
				productName: sale.soldProducts.name,
				deliveryDate: sale.deliveryDate,
			}),
		);
	};

	return (
		<tr
			className={`hover:bg-primary-lightblue/30 relative text-sm ${index % 2 === 1 ? 'bg-evenRawsbg' : ''}`}
			onClick={handleRowClick}
			style={{ cursor: 'pointer' }}
		>
			<td className="w-20 h-16">
				<img
					src={sale.soldProducts.images[0]}
					alt=""
					className="w-full h-full object-cover rounded-lg"
				/>
			</td>
			<td>
				{sale?.soldProducts?.name?.length > 15
					? `${sale?.soldProducts?.name?.substring(0, 15)}...`
					: `${sale?.soldProducts?.name}`}
			</td>
			<td>{sale.quantitySold}</td>
			<td className={getStatusClass(sale.status)}>{sale.status}</td>
			<td>{formatDate(sale.deliveryDate)}</td>
			<td className="relative">
				<button onClick={handleThreeDotClick}>
					<BsThreeDotsVertical />
				</button>
				{isModalOpen && selectedSaleId === sale.id && <div></div>}
			</td>
		</tr>
	);
};

export default SalesTableRow;
