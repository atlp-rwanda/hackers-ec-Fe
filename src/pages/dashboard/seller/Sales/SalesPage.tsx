import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { getSales } from '../../../../redux/features/Sales/AllSaleSlice';
import { HashLoader } from 'react-spinners';
import Pagination from '../../../../utils/Pagination';
import SalesTableRow from './SalesTableRows';
import UpdateOrderModal from './UpdateOrderModal';
import formatDate from '../../../../utils/DateConversion';
import { getStatusClass } from '../../../../utils/ColorChange';
import useToast from '../../../../hooks/useToast';

const SalesPage = () => {
	const dispatch = useAppDispatch();
	const {
		isLoading,
		allSalesData: sales,
		isModalOpen,
	} = useAppSelector((state) => state.sales);

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 10;
	const pageCount = Math.ceil(sales.length / itemsPerPage);

	const handlePageChange = (selectedPage: number) => {
		setCurrentPage(selectedPage);
	};
	const { showErrorMessage } = useToast();

	useEffect(() => {
		dispatch(getSales())
			.unwrap()
			.catch((error) => {
				showErrorMessage(error.message);
			});
	}, [dispatch]);

	const offset = currentPage * itemsPerPage;
	const currentSales = sales.slice(offset, offset + itemsPerPage);

	return (
		<div className="parent_container relative max-h-[80%] overflow-y-scroll overflow-hidden pb-4 mt-4 h-full">
			{isLoading ? (
				<div className="w-full h-full flex items-center justify-center">
					<HashLoader
						color="#256490"
						role="progressbar"
						aria-label="single_product_loader"
					/>
				</div>
			) : (
				<>
					<div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-10 bg-neutral-white p-2 rounded-md max-w-[90%]">
						<div className="flex justify-between items-center">
							<h1 className="mb-5 text-lg">Sales</h1>
						</div>
						{currentSales.length === 0 ? (
							<div className="w-full h-[550px] flex items-center flex-col justify-center">
								<h2 className="font-bold text-center text-xl text-blue-950">
									Sorry, You haven't sold anything yet!
								</h2>
							</div>
						) : (
							<table className="tables pt-2 p-3 overflow-hidden overflow-x-scroll max-w-[18rem] tablet:max-w-[100%]">
								<thead className="bg-[#256490] text-neutral-white text-left overflow-hidden rounded-3xl p2">
									<tr className="rounded-xl text-sm">
										<th>Image</th>
										<th>Product</th>
										<th>Quantity</th>
										<th>Status</th>
										<th>Delivery date</th>
										<th className="expand">Action</th>
									</tr>
								</thead>
								<tbody className="text-slate-700">
									{currentSales.map((sale, index) => (
										<SalesTableRow
											key={sale.id}
											sale={sale}
											index={index}
											formatDate={formatDate}
											getStatusClass={getStatusClass}
										/>
									))}
								</tbody>
							</table>
						)}
					</div>
					<div className="flex items-center justify-center">
						<Pagination
							data-testid="pagination-component"
							pageCount={pageCount}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
					{isModalOpen && (
						<UpdateOrderModal data-test-id="update-order-modal" />
					)}
				</>
			)}
		</div>
	);
};

export default SalesPage;
