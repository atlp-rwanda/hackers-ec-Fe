import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { DynamicData } from '../../../../@types/DynamicData';
import BackButton from '../../../../components/buttons/BackButton';
import Pagination from '../../../../components/dashboard/buyer/Pagination';
import { getSingleOrder } from '../../../../redux/features/OrdersSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import getStatusColor from '../../../../utils/statusColor';

const SingleOrders = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const { isLoading, singleOrder } = useAppSelector((state) => state.order);

	useEffect(() => {
		if (id) {
			dispatch(getSingleOrder(id || '')).unwrap();
		}
	}, [dispatch, id]);

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 3;

	const SingleOrderArray = Array.isArray(singleOrder) ? singleOrder : [];
	const offset = currentPage * itemsPerPage;

	const paginatedSales =
		SingleOrderArray[0]?.sales.slice(offset, offset + itemsPerPage) || [];
	const pageCount = Math.ceil(
		(SingleOrderArray[0]?.sales.length || 0) / itemsPerPage,
	);

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected);
	};

	return (
		<>
			<div className="bg-neutral-white flex flex-col px-8 mx-auto my-24 tablet:mb-12 tablet:mt-44 ipad:w-[80%] laptop:w-[70%]">
				{isLoading ? (
					<div
						className="loader_icon flex justify-center items-center h-screen"
						role="progressbar"
						aria-label="menu"
					>
						<ScaleLoader color="#256490" />
					</div>
				) : (
					<>
						{SingleOrderArray.map((item: DynamicData, idx: number) => (
							<div key={idx} className="space-y-10 tablet:space-y-8 ">
								<div className="flex justify-end items-center ">
									<BackButton
										isBordered
										url="/orders"
										title={''}
										otherStyles="bg-primary-lightblue text-neutral-white _shadow hover:bg-primary-lightblue/85"
									/>
								</div>
								<div className=" space-y-5 bg-neutral-white px-7 py-8 ipad:py-12 ipad:space-y-8 rounded-lg _shadow">
									<div className="flex flex-col gap-2 tablet:flex-row justify-between">
										<h3 className="font-bold tablet:text-lg">
											Order Id: <span>#{item.id?.slice(0, 5)}</span>
										</h3>
										<p className="font-semibold">
											Delivery Date:{' '}
											<span className="font-normal">
												{new Date(
													item.sales[0].deliveryDate || 0,
												).toLocaleDateString()}
											</span>
										</p>
									</div>
									<div className="flex flex-col gap-2 tablet:flex-row justify-between">
										<p className="font-semibold">
											Items:{' '}
											<span className="font-normal">{item.sales.length}</span>
										</p>
										<p className="font-semibold">
											Status:
											<span className={`${getStatusColor(item.status)} pl-2`}>
												{item.status}
											</span>
										</p>
									</div>
									<p className="font-semibold">
										Total Price:{' '}
										<span className="text-primary-lightblue mr-1">
											{item.sales.reduce(
												(acc: number, sale: DynamicData) =>
													acc +
													(sale.soldProducts.price -
														(sale.soldProducts.price *
															sale.soldProducts.discount) /
															100) *
														sale.quantitySold,
												0,
											)}
										</span>
										<span className="text-primary-lightblue">RWF</span>
									</p>
								</div>
								<div className="_shadow rounded-2xl">
									<div className=" flex flex-col tablet:flex tablet:flex-row tablet:justify-evenly bg-neutral-white p-2">
										{paginatedSales.map((sale: DynamicData, idx: number) => (
											<div
												key={idx}
												className=" p-4 m-4 rounded-lg _shadow space-y-5"
											>
												<div className=" ">
													<img
														src={sale.soldProducts.images[0]}
														alt="image"
														className="rounded-lg w-full h-48 tablet:w-60 tablet:h-50 object-cover"
													/>
												</div>
												<div className="space-y-3">
													<div>
														<p className="font-bold">
															Product:{' '}
															<span className="font-medium">
																{sale.soldProducts.name}
															</span>
														</p>
													</div>
													<div>
														<p className="font-bold">
															Price:{' '}
															<span className="font-medium">
																{sale.soldProducts.price}
															</span>{' '}
															Rwf
														</p>
													</div>
													<div>
														<p className="font-bold">
															Status:{' '}
															<span
																className={`${getStatusColor(sale.status)} pl-0.5`}
															>
																{sale.status}
															</span>
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
									<div className="flex items-center justify-center pb-7">
										<Pagination
											pageCount={pageCount}
											onPageChange={handlePageClick}
										/>
									</div>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</>
	);
};
export default SingleOrders;
