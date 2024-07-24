import { useEffect } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { ScaleLoader } from 'react-spinners';
import { DynamicData } from '../../../@types/DynamicData';
import { ButtonIcon } from '../../../components/buttons/ButtonIcon';
import ProductImageCard from '../../../components/cards/ProductImageCard';
import useToast from '../../../hooks/useToast';
import {
	productAvailability,
	setAvailability,
} from '../../../redux/features/productAvailabilitySlice';
import { getSinleProducts } from '../../../redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';

const SellerSingleProduct = () => {
	const { id } = useParams();
	const { isLoading, singleProduct } = useAppSelector((state) => state.product);
	const { availability } = useAppSelector((state) => state.productAvailability);
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();

	useEffect(() => {
		const getSingleProduct = async () => {
			if (id) {
				await dispatch(getSinleProducts(id)).unwrap();
			}
		};
		getSingleProduct();
	}, [dispatch, id]);

	useEffect(() => {
		if (singleProduct.length > 0) {
			dispatch(
				setAvailability(
					singleProduct[0]?.isAvailable ? 'Available' : 'Unavailable',
				),
			);
		}
	}, [singleProduct]);

	const handleProductAvailability = async (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const newAvailability = e.target.value;
		const isAvailable = newAvailability === 'Available';

		try {
			if (id) {
				const res = await dispatch(
					productAvailability({ id, isAvailable }),
				).unwrap();
				showSuccessMessage(res.message);
				dispatch(setAvailability(newAvailability));
			}
		} catch (error) {
			const err = error as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
	};

	return (
		<div className="parent_single_product_coverer relative p-4 h-full max-h-[50rem] laptop:max-h-[40rem] desktop:max-h-[50rem]">
			{isLoading ? (
				<div className="w-full absolute h-full flex items-center justify-center">
					<ScaleLoader
						color="#256490"
						role="progressbar"
						aria-label="single_product_loader"
					/>
				</div>
			) : (
				<div className="single_product_wrapper flex flex-col mobile:max-w-[95%] mobile:m-auto h-[85%] mobile:h-full">
					<div className="wrapper mobile:mt-12 ipad:mt-0 flex flex-col items-center mobile:gap-4 h-full">
						<h1 className="text-2xl font-semibold bg-neutral-white mobile:bg-transparent w-full text-center p-2">
							Product Details
						</h1>
						<div className="product mt-4 mobile:mt-0 relative flex flex-col items-center mobile:flex-row mobile:rounded-3xl bg-neutral-white product_card overflow-hidden pt-2 mobile:pb-0 mobile:p-8 space-x-10 laptop:space-x-10 -ml-1 mobile:py-4 h-full">
							<div className="images flex-1 h-full">
								<div className="big_product_image p-2 w-full h-[35vh] mobile:h-[40vh] laptop:h-[45vh] desktop:h-[50vh] rounded-2xl overflow-hidden desktop:p-2">
									<img
										src={singleProduct[0]?.images[0]}
										alt="big_image"
										className="w-full h-full object-cover rounded-md"
									/>
								</div>
								<div className="other_images max-w-[20rem] mobile:max-w-[25rem] ipad:max-w-[30rem] laptop:max-w-[35rem] bg-neural-darkRed mobile:h-44 rounded-md overflow-hidden gap-4 mt-5 flex-col">
									<Slider {...settings}>
										{singleProduct[0]?.images?.map(
											(item: string, idx: number) => (
												<ProductImageCard key={idx} image={item} idx={0} />
											),
										)}
									</Slider>
								</div>
							</div>
							<div className="product_details mt-4 mobile:mt-0 flex-1 grid grid-cols-2 gap-2 mobile:flex flex-col mobile:space-y-8 laptop:space-y-8 mobile:py-10 pb-2">
								<h1 className="text-sm mobile:text-xl laptop:text-2xl">
									{singleProduct[0]?.name}
								</h1>
								<p className="text-[10px] mobile:text-xs font-bold flex items-center gap-2 laptop:text-xl">
									Discount:
									<small>{singleProduct[0]?.discount}% off</small>
								</p>
								<p className="text-[10px] mobile:text-xs font-bold flex items-center gap-2 laptop:text-xl">
									Price:
									<small className="font-normal">
										{singleProduct[0]?.price} RWF
									</small>
								</p>
								<p className="text-[10px] mobile:text-xs font-bold flex items-center gap-2 laptop:text-xl">
									Category:
									<small className="font-normal">
										{singleProduct[0]?.category?.name}
									</small>
								</p>
								<p className="text-[10px] mobile:text-xs font-bold flex items-center gap-2 flex-nowrap laptop:text-xl">
									Expiry Date:
									<small className="font-normal">
										{singleProduct[0]?.expiryDate
											? singleProduct[0].expiryDate.split('T')[0]
											: 'N/A'}
									</small>
								</p>
								<p className="text-[10px] mobile:text-xs font-bold flex items-center gap-2 laptop:text-xl">
									Status:
									<select
										value={availability}
										onChange={handleProductAvailability}
										className="font-normal  border-2 border-primary-lightblue px-1 py-1 rounded laptop:px-3 text-black ml-2 shadow"
									>
										<option value="Available" className="option">
											Available
										</option>
										<option value="Unavailable" className="option">
											Unavailable
										</option>
									</select>
								</p>
							</div>
							<Link to={'/dashboard/products'}>
								<ButtonIcon className="absolute top-4 right-4 bg-transparent mobile:bg-primary-lightblue mobile:text-neutral-white text-primary-lightblue border-primary-lightblue border-2">
									<IoChevronBackSharp />
								</ButtonIcon>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SellerSingleProduct;
