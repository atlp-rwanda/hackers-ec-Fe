import { FaHeart, FaCartPlus, FaPlus, FaMinus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { useEffect } from 'react';
import { getSinleProducts } from '../redux/features/productSlice';
import { ButtonIcon } from '../components/buttons/ButtonIcon';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { ScaleLoader } from 'react-spinners';
import { IoChevronBackSharp } from 'react-icons/io5';
import ProductImageCard from '../components/cards/ProductImageCard';

const SingleProduct = () => {
	const { isLoading, singleProduct } = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id) {
			dispatch(getSinleProducts(id)).unwrap();
		}
	}, [dispatch, id]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
	};

	return (
		<>
			<div className="perent_single_product_container min-h-screen relative pb-10 laptop:pb-0 mt-28 mobile:mt-32 ipad:mt-32">
				{isLoading ? (
					<div
						className="loader_icon w-full h-full flex items-center justify-center absolute"
						role="progressbar"
						aria-label="menu"
					>
						<ScaleLoader color="#256490" />
					</div>
				) : (
					<div className="single_product_wrapper relative bg-neutral-white product_card w-[98%] mobile:max-w-[80%] m-auto h-auto rounded-2xl laptop:mt-44">
						<div className="top_single_product flex flex-col laptop:flex-row gap-10 p-[5%] ipad:p-[6%] laptop:p-[4%] ">
							<div className="images flex flex-col w-full laptop:w-[50%]">
								<div className="image flex w-full h-[40vh] mobile:h-[40vh] laptop:h-[50vh] rounded-2xl overflow-hidden relative">
									<img
										src={
											singleProduct[0] &&
											singleProduct[0]?.images &&
											singleProduct[0].images[0]
										}
										alt="single_product_image"
										className="w-full object-cover h-full"
									/>
									<FaHeart className="wish_btn absolute right-4 top-4 text-2xl text-action-error" />
								</div>
								<Slider {...settings}>
									{singleProduct[0]?.images?.map(
										(item: string, index: number) => (
											<ProductImageCard key={index} image={item} idx={0} />
										),
									)}
								</Slider>
							</div>
							<div className="description flex flex-col flex-1 gap-10 pt-6 px-5">
								<h1 className="text-2xl font-semibold">
									{singleProduct[0]?.name}
								</h1>
								<h1 className="text-2xl font-semibold">
									{singleProduct[0]?.price}{' '}
									<small className="text-base font-normal">RWF</small>
								</h1>

								<div className="action flex justify-between gap-3">
									<div className="quantity flex flex-col gap-2">
										<h1>Quantity</h1>
										<div className="buttons flex gap-3">
											<FaMinus className=" p-1 rounded-full text-2xl border-2 border-primary-lightblue cursor-pointer" />{' '}
											1{' '}
											<FaPlus className=" bg-primary-lightblue p-1 rounded-full text-2xl border-2 border-primary-lightblue text-neutral-white cursor-pointer" />
										</div>
									</div>
									<div className="add_to_cart  flex items-center">
										<ButtonIcon>
											<FaCartPlus /> Add to cart
										</ButtonIcon>
									</div>
								</div>
							</div>
						</div>
						<Link to={'/products'}>
							<ButtonIcon className="absolute py-1 mobile:py-2 -top-8 mobile:top-0 right-0 ipad:top-4 mobile:-right-20 mobile:px-6 ipad:px-8 ipad:right-4 bg-transparent bg-primary-lightblue text-neutral-white border-primary-lightblue border-2 ">
								<IoChevronBackSharp />
							</ButtonIcon>
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default SingleProduct;
