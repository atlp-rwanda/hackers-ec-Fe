import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import { getSingleSale } from '../../../../redux/features/Sales/AllSaleSlice';
import { RootState } from '../../../../redux/store';
import { Link, useParams } from 'react-router-dom';
import formatDate from '../../../../utils/DateConversion';
import { ScaleLoader } from 'react-spinners';
import { ButtonIcon } from '../../../../components/buttons/ButtonIcon';
import { IoChevronBackSharp } from 'react-icons/io5';
import useToast from '../../../../hooks/useToast';

const SingleSale: React.FC = () => {
	const dispatch = useAppDispatch();
	const { singleSaleData: sale, isLoading } = useAppSelector(
		(state: RootState) => state.sales,
	);

	const { id } = useParams();
	const { showErrorMessage } = useToast();

	useEffect(() => {
		if (id) {
			dispatch(getSingleSale(id))
				.unwrap()
				.catch((error) => {
					showErrorMessage(error.message);
				});
		}
	}, [dispatch, id]);

	const finalPrice = (price: number, discount: number) => {
		const final = price - (price * discount) / 100;
		return final;
	};

	return (
		<div className="parent_singleSale_Wrapper relative p-4 h-full max-h-fit overflow-y-auto">
			{isLoading ? (
				<div className="w-full absolute h-full flex items-center justify-center ">
					<ScaleLoader
						color="#256490"
						role="progressbar"
						aria-label="single_product_loder"
					/>
				</div>
			) : (
				<div className=" sale-wrapper flex flex-col h-fit justify-center items-center text-center  text-[1rem]  bg-neutral-white py-8  mt-6 rounded-md w-full tablet:max-w-[100%] ">
					<h1 className="text-3xl font-bold">Sale details</h1>
					<div className="border-b border-neutral-black w-full text-start p-10">
						<h3 className="text-xl font-bold mb-5">Sale Information</h3>
						<p>Status: {sale?.data.status}</p>
						<p>Delivery date: {formatDate(sale?.data.deliveryDate)}</p>
						<p>Quantity sold: {sale?.data.quantitySold}</p>
					</div>
					<div className="flex justify-between items-start border-b border-neutral-black w-full p-10">
						<div className="text-start">
							<h3 className="text-xl font-bold mb-5">Product Information</h3>
							<p>Product name: {sale?.data.soldProducts?.name}</p>
							<p>Price: {sale?.data.soldProducts.price}</p>
							<p>Discount: {sale?.data.soldProducts.discount}</p>
							<p>
								Final price:{' '}
								{finalPrice(
									sale?.data.soldProducts.price,
									sale?.data.soldProducts.discount,
								)}
							</p>
							<p>Available Quantity: {sale?.data.soldProducts.quantity}</p>
							<p>
								Expiry Date: {formatDate(sale?.data.soldProducts.expiryDate)}
							</p>
							<p>
								Is Available:{' '}
								{sale?.data.soldProducts.isAvailable ? 'Yes' : 'No'}
							</p>
						</div>
						<div className="w-80 h-80 rounded-lg hidden  tablet:flex">
							<img
								src={sale?.data.soldProducts.images[0]}
								alt="product image"
								className="rounded-lg object-cover w-full h-full"
							/>
						</div>
					</div>
				</div>
			)}
			<Link to={'/dashboard/sales'}>
				<ButtonIcon className="absolute top-12 right-10 bg-transparent mobile:bg-primary-lightblue mobile:text-neutral-white text-primary-lightblue border-primary-lightblue border-2">
					<IoChevronBackSharp />
				</ButtonIcon>
			</Link>
		</div>
	);
};

export default SingleSale;
