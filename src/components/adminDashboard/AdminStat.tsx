/* eslint-disable react-hooks/exhaustive-deps */
import { FaPeopleGroup } from 'react-icons/fa6';
import UserStatCard from '../cards/UserStatsCard';
import { BsCart4 } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { useEffect } from 'react';
import { getAdminStats } from '../../redux/features/adminStatsSlice';
import { DynamicData } from '../../@types/DynamicData';
import WaterPercentCard from '../cards/WaterPercentCard';
import { HashLoader } from 'react-spinners';
import {
	calculateTotalPrice,
	calculateTotalQuantity,
} from '../../utils/orderCalculations';

function AdminStat() {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.adminStatsSlice);

	useEffect(() => {
		if (data?.data === null) {
			dispatch(getAdminStats()).unwrap().catch();
		}
	}, [dispatch]);
	if (data.isLoading) {
		return (
			<div className="w-full h-screen">
				<div
					className="flex-1 h-full flex-center flex-col gap-4"
					data-testid="get-user-table-id"
				>
					<HashLoader color="#266491" size={60} role="progressbar" />
					<p className="text-xs">Please wait ...</p>
				</div>
			</div>
		);
	}

	const formatProductNames = (sales: DynamicData[]) => {
		const productNames = sales
			.map((sale) => sale.soldProducts?.name)
			.filter(Boolean);
		const displayedNames = productNames.slice(0, 3).join(', ');
		return productNames.length > 3 ? `${displayedNames}, ...` : displayedNames;
	};
	return (
		<div
			className={` tablet:p-3 h-[90vh] w-[80%]  bimobile:w-full overflow-y-auto no-scrollbar flex flex-col gap-12`}
			aria-label="container"
		>
			{data?.data && (
				<>
					<div className="grid grid-cols-1 gap-5 mobile:grid-cols-2 ipad:grid-cols-3">
						<UserStatCard
							title="Total Sellers"
							totalAmount={data?.data?.Numbersofsellers?.count}
							numberOfItems={data?.data?.activeSellers}
							color="bg-green-600"
							icon={<FaPeopleGroup size={24} />}
							subtitle="Active sellers"
						/>
						<UserStatCard
							title="Total Buyers"
							totalAmount={data?.data?.NumberofBuyer?.count}
							numberOfItems={data?.data?.activeBuyers}
							color="bg-primary-lightblue"
							icon={<FaPeopleGroup size={24} />}
							subtitle="Active buyers"
						/>
						<UserStatCard
							title="Total Orders"
							totalAmount={data?.data?.NumberofOrders?.rows.length}
							numberOfItems={data?.data?.completedOrder?.length}
							color="bg-orange-700"
							icon={<BsCart4 size={24} />}
							subtitle="Completed Orders"
						/>
					</div>
					<div className="w-full flex gap-6 flex-col tablet:flex-row">
						<div className="flex ">
							<div className="flex flex-col  justify-center w-[82%]  mobile:w-full  max-w-sm p-6 bg-primary-lightblue  border border-gray-200 rounded-lg shadow">
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-neutral-white ">
									Great job! Shop trovel have successfully completed{' '}
									{Math.ceil(data?.data?.completedOrderPercent)}% of your sales
									target
								</h5>
								<p className="font-normal text-white w-[80%] pt-4  ">
									Keep up the excellent work! You can view the detailed sales
									report to track your progress.
								</p>
								<span className="flex">
									<WaterPercentCard
										percent={Math.ceil(data?.data?.completedOrderPercent)}
										background="bg-white"
										borderColor="border-white"
									/>
								</span>
							</div>
						</div>
						<div className="flex-1  rounded-2xl overflow-hidden bg-neutral-100 ">
							<div className="p-5 text-lg  font-semibold text-left rtl:text-right text-gray-900 bg-white">
								Recent Orders
							</div>
							<div className="relative  shadow-md  h-[27rem]  overflow-y-auto overflow-x-auto ">
								<table className=" w-full text-sm text-left rtl:text-right text-gray-500">
									<thead className="text-xs text-gray-700 uppercase bg-white ">
										<tr>
											<th scope="col" className="px-6 py-3">
												Product
											</th>
											<th scope="col" className="px-6 py-3">
												Quantity
											</th>
											<th scope="col" className="px-6 py-3">
												Price
											</th>
											<th scope="col" className="px-6 py-3">
												Status
											</th>
										</tr>
									</thead>
									<tbody>
										{data?.data &&
											[...data.data.NumberofOrders.rows]
												.reverse()
												.map((item: DynamicData, index: number) => (
													<tr
														className={`border-gray-700 ${index % 2 === 0 ? 'bg-[#DDDD]' : ''}bg-neutral-white hover:bg-black/10 `}
														key={item.id}
													>
														<th
															scope="row"
															className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-4 items-center"
														>
															<img
																src={item?.sales[0]?.soldProducts?.images[0]}
																alt=""
																className="w-10 h-10 p-1 bg-black/40 object-cover rounded-lg"
															/>
															{formatProductNames(item?.sales)}
														</th>
														<td className="px-6 py-4">
															{calculateTotalQuantity(item?.sales)}
														</td>
														<td className="px-6 py-4">
															{calculateTotalPrice(item?.sales)}RWF
														</td>
														<td className="px-6 py-4">{item?.status}</td>
													</tr>
												))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default AdminStat;
