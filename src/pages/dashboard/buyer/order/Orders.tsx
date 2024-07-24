import { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import OrderTableComp from '../../../../components/dashboard/buyer/OrderTableComp';
import { getOrders } from '../../../../redux/features/OrdersSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import EmptyOrder from '../order/EmptyOrder';

const Orders = () => {
	const dispatch = useAppDispatch();
	const { isLoading, numberOfOrder } = useAppSelector((state) => state.order);
	const data = useAppSelector((state) => state.order.orders);

	useEffect(() => {
		dispatch(getOrders()).unwrap;
	}, [dispatch]);

	const [openModels, setOpenModels] = useState<{ [key: number]: boolean }>({});

	const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = 5;
	const orderArray = Array.isArray(data) ? data : [];
	const reversedOrderArray = [...orderArray].reverse();
	const offset = currentPage * itemsPerPage;
	const orders = reversedOrderArray.slice(offset, offset + itemsPerPage);
	const pageCount = Math.ceil(reversedOrderArray.length / itemsPerPage);

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected);
	};

	const toggleItemModel = (idx: number) => {
		setOpenModels((prev) => ({
			...prev,
			[idx]: !prev[idx],
		}));
	};

	return (
		<div className="bg-neutral-white flex flex-col px-8 mx-auto my-24 tablet:mb-15 tablet:mt-36">
			{isLoading ? (
				<div
					className="loader_icon flex justify-center items-center h-screen"
					role="progressbar"
					aria-label="menu"
				>
					<ScaleLoader color="#256490" />
				</div>
			) : numberOfOrder <= 0 ? (
				<EmptyOrder />
			) : (
				<OrderTableComp
					orders={orders}
					openModels={openModels}
					toggleItemModel={toggleItemModel}
					pageCount={pageCount}
					handlePageClick={handlePageClick}
				/>
			)}
		</div>
	);
};

export default Orders;
