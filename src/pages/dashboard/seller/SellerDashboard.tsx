import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { Stats } from '../../../@types/StatisticsTypes';
import SellerBarChart from '../../../components/cards/SellerBarChart';
import StatisticCard from '../../../components/cards/StatisticCard';
import useHandleResize from '../../../hooks/useHandleResize';
import { getSales } from '../../../redux/features/Sales/AllSaleSlice';
import { getStats } from '../../../redux/features/statisticsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import WaterPercentCard from '../../../components/cards/WaterPercentCard';

const chartData = [
	{ month: 'Jan', approvals: 0, rejected: 0, numberMonth: 1 },
	{ month: 'Feb', approvals: 0, rejected: 0, numberMonth: 2 },
	{ month: 'Mar', approvals: 0, rejected: 0, numberMonth: 3 },
	{ month: 'Apr', approvals: 0, rejected: 0, numberMonth: 4 },
	{ month: 'May', approvals: 0, rejected: 0, numberMonth: 5 },
	{ month: 'June', approvals: 0, rejected: 0, numberMonth: 6 },
	{ month: 'Jul', approvals: 0, rejected: 0, numberMonth: 7 },
	{ month: 'Aug', approvals: 0, rejected: 0, numberMonth: 8 },
	{ month: 'Sept', approvals: 0, rejected: 0, numberMonth: 9 },
	{ month: 'Oct', approvals: 0, rejected: 0, numberMonth: 10 },
	{ month: 'Nov', approvals: 0, rejected: 0, numberMonth: 11 },
	{ month: 'Dec', approvals: 0, rejected: 0, numberMonth: 12 },
];

const initialValues: Stats = {
	TAMOUNT_APPROVALS: 0,
	TAMOUNT_REJECTED: 0,
	TAMOUNT_PENDING: 0,
	TAMOUNT_SALES: 0,
	NUMBER_PENDING: 0,
	NUMBER_SALES: 0,
};

const SellerDashboard = () => {
	const dispatch = useAppDispatch();
	const { show } = useHandleResize();
	const [VALUES, setVALUES] = useState(initialValues);
	const { isLoading, allSalesData } = useAppSelector((state) => state.sales);
	const {
		isLoading: processing,
		data: statisticsData,
		lossPercent,
		expiredProductPercent,
	} = useAppSelector((state) => state.statistics);

	useEffect(() => {
		if (allSalesData.length === 0) {
			dispatch(getSales());
		}
		if (!statisticsData || Object.keys(statisticsData).length === 0) {
			dispatch(getStats());
		}
	}, [allSalesData.length, dispatch, statisticsData]);

	useEffect(() => {
		const updateChart = () => {
			if (allSalesData.length > 0) {
				chartData.forEach((monthData) => {
					monthData.approvals = 0;
					monthData.rejected = 0;
				});

				const monthlyTotals = chartData.map((monthData) => {
					const monthSales = allSalesData.filter(
						(sale) =>
							new Date(sale.createdAt).getMonth() + 1 === monthData.numberMonth,
					);
					const approvalsNumber = monthSales.filter(
						(sale) => sale.status === 'delivered',
					).length;
					const rejectedNumber = monthSales.filter(
						(sale) => sale.status === 'canceled',
					).length;

					return {
						...monthData,
						approvals: approvalsNumber,
						rejected: rejectedNumber,
						total: monthSales.length,
					};
				});

				monthlyTotals.forEach((monthTotal) => {
					const monthData = chartData.find(
						(data) => data.numberMonth === monthTotal.numberMonth,
					);
					if (monthData) {
						monthData.approvals =
							(monthTotal.approvals / monthTotal.total) * 100;
						monthData.rejected = (monthTotal.rejected / monthTotal.total) * 100;
					}
				});

				setVALUES((prev) => ({
					...prev,
					NUMBER_PENDING: allSalesData.filter(
						(item) => item.status === 'pending',
					).length,
				}));

				const totalAmountForAllSales = allSalesData.reduce((acc, item) => {
					const itemTotal = item.soldProducts.price * item.quantitySold;
					return acc + itemTotal;
				}, 0);

				const totalAmountFor = (status: string) => {
					const amount = allSalesData
						.filter((item) => item.status === status)
						.reduce((acc, item) => {
							const itemTotal = item.soldProducts.price * item.quantitySold;
							return acc + itemTotal;
						}, 0);
					return amount;
				};

				setVALUES((prev) => ({
					...prev,
					TAMOUNT_SALES: totalAmountForAllSales,
				}));
				setVALUES((prev) => ({
					...prev,
					TAMOUNT_APPROVALS: totalAmountFor('delivered'),
				}));
				setVALUES((prev) => ({
					...prev,
					TAMOUNT_REJECTED: totalAmountFor('canceled'),
				}));
				setVALUES((prev) => ({
					...prev,
					TAMOUNT_PENDING: totalAmountFor('pending'),
				}));
				setVALUES((prev) => ({ ...prev, NUMBER_SALES: allSalesData.length }));
			}
		};
		updateChart();
	}, [statisticsData, allSalesData]);

	if (isLoading || processing) {
		return (
			<div className="flex-1 h-full flex-center flex-col gap-4">
				<HashLoader color="#266491" size={60} role="progressbar" />
				<p className="text-xs">Please wait ...</p>
			</div>
		);
	}

	return (
		<div
			className={`p-3 h-[90vh] overflow-y-auto no-scrollbar ${!show && 'pb-14'}`}
			aria-label="container"
		>
			<div className="grid grid-cols-1 gap-5 mobile:grid-cols-2 ipad:grid-cols-3">
				<StatisticCard
					title="Total Expected Sales"
					totalAmount={`${VALUES.TAMOUNT_SALES}`}
					numberOfItems={VALUES.NUMBER_SALES}
					color="bg-primary-lightblue"
				/>
				<StatisticCard
					title="Total Products value"
					totalAmount={`${statisticsData?.allProductsValue}`}
					minAmount={`${statisticsData?.currentProductsValue}`}
					numberOfItems={statisticsData?.totalProducts as number}
					color="bg-[#0b79c8]"
				/>
				<StatisticCard
					title="Pending Sales"
					totalAmount={`${VALUES.TAMOUNT_PENDING}`}
					numberOfItems={VALUES.NUMBER_PENDING}
					color="bg-action-success"
				/>
			</div>
			<div
				className={`w-full min-h-[65vh] mt-3 flex ${!show && 'flex-col gap-10'} gap-5 items-center justify-center`}
			>
				<div className="flex-1 p-5 h-full shadow-custom-heavy bg-neutral-white rounded-2xl">
					<div className="p-5 w-full flex items-center gap-5 justify-between">
						<div>
							<h2 className="text-sm ipad:text-base font-semibold text-neutral-black/70">
								Total Approved Sales
							</h2>
							<div className="text-base ipad:text-2xl font-bold">
								{VALUES.TAMOUNT_APPROVALS} RWF
							</div>
						</div>
						<div>
							<h2 className="text-sm ipad:text-base font-semibold text-neutral-black/70">
								Total Rejected Sales
							</h2>
							<div className="text-base ipad:text-2xl font-bold">
								{VALUES.TAMOUNT_REJECTED} RWF
							</div>
						</div>
					</div>
					<SellerBarChart chartData={chartData} />
				</div>
				<div className="bg-neutral-white w-full mobile:w-[70%] ipad:w-max shadow-custom-heavy rounded-2xl">
					<div
						className={`w-full ipad:w-80 py-3 flex items-center justify-center shadow-inner-bottom rounded-2xl ${show ? 'flex-col' : 'flex-col'}`}
					>
						<div className={'my-5'}>
							<h2
								className={`text-lg text-center font-bold ${show && '-mb-3'}`}
							>
								Loss
							</h2>
							<WaterPercentCard
								percent={Math.round(lossPercent * 100)}
								background="bg-[#ffa500]"
								borderColor="border-[#ffa500]/70"
							/>
						</div>
						<div>
							<h2 className="text-lg text-center font-bold">
								Expired products
							</h2>
							<WaterPercentCard
								percent={Math.round(expiredProductPercent * 100)}
								background="bg-[#808080]"
								borderColor="border-[#808080]/70"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerDashboard;
