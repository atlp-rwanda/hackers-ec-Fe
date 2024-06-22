import { useEffect, useState } from 'react';
import { FaCaretDown, FaCartPlus, FaHeart, FaStar } from 'react-icons/fa';
import { ScaleLoader } from 'react-spinners';
import { DynamicData } from '../@types/DynamicData';
import CategoryModel from '../components/CategoryModel';
import Button from '../components/buttons/Button';
import { getProducts } from '../redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { depart_icon } from '../utils/images';

const ProductsPage = () => {
	const { isLoading, products } = useAppSelector((state) => state.product);
	const [openModel, setOpenModel] = useState(false);
	const dispatch = useAppDispatch();

	const toggleModel = () => {
		setOpenModel(!openModel);
	};

	useEffect(() => {
		dispatch(getProducts()).unwrap();
	}, [dispatch]);

	return (
		<>
			<div className="perent_products_container min-h-screen relative mt-10 mobile:mt-32">
				{isLoading ? (
					<div className="w-full h-full flex items-center justify-center absolute">
						<ScaleLoader color="#256490" role="progressbar" />
					</div>
				) : (
					<div className="products_container flex flex-col items-center laptop:flex-row laptop:items-start pl-[5%] w-full mt-16 laptop:gap-16">
						<div className="departments flex p-4 w-[80%] mobile:w-[60%] ipad:w-[40%] laptop:w-[20%]">
							<div className="depart_icon w-[90%] bg-primary-lightblue p-2 flex items-center h-12 justify-between gap-2 mt-6 rounded-t-md relative">
								<img src={depart_icon} alt="depart_icon" className="w-6 h-10" />
								<h1 className="text-md font-semibld text-neutral-white">
									All departments
								</h1>
								<FaCaretDown
									className="text-3xl text-neutral-white"
									onClick={toggleModel}
								/>
								<CategoryModel openModel={openModel} />
							</div>
						</div>

						<div className="product_card_container mt-4 max-h-[95vh] overflow-hidden overflow-y-scroll grid mobile:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 w-[80%] gap-10 h-full py-10 mr-[5%] place-items-center">
							{Array.isArray(products) &&
								products.map((item: DynamicData, idx: number) => (
									<div
										className="product_card bg-neutral-white p-4 flex flex-col rounded-md shadow laptop:max-w-[100%] h-full"
										key={idx}
									>
										<div className="card_profile p-2 w-full flex-grow">
											<div className="w-full h-48 relative">
												<div className="w-full overflow-hidden flex shadow h-48">
													<img
														src={item.images && item.images[0]}
														alt="card_profile"
														className="w-full h-full object-cover rounded-lg"
													/>
												</div>
												<div className="cart_icon cart_btn absolute right-3 bottom-3 text-neutral-white bg-primary-lightblue p-2 text-2xl rounded-full flex items-center justify-center cursor-pointer">
													<FaCartPlus />
												</div>
												{item.discount > 0 && (
													<div className="discount absolute p-1 rounded bg-action-warning text-neutral-white -right-2 -top-2 font-bold">
														{item.discount}%
													</div>
												)}
											</div>
										</div>
										<div className="card_description pl-2 flex-grow">
											<h1 className="py-2">
												{item.name.length > 20
													? item.name.slice(0, 20) + '...'
													: item.name}
											</h1>
											<div className="ratings flex">
												<span className="ml-2 flex items-center gap-2">
													<FaStar />
													{item.ratings} ratings
												</span>
											</div>
											<div className="price_wish flex justify-between items-center mt-2 gap-2 flex-wrap py-2">
												<h1 className="text-2xl font-bold">
													{item.price}
													<small className="text-base font-normal"> RWF</small>
												</h1>
												<div className="wish flex items-center cursor-pointer">
													<span className="mr-1">add to wish</span>
													<FaHeart className=" text-action-error text-2xl cursor-pointer wish_btn" />
												</div>
											</div>
										</div>
										<div className="btn flex justify-center">
											<Button
												title="preview product"
												url={`/products/${item.id}`}
												otherStyles={
													' rounded-l-full rounded-r-full mt-2 font-semibold'
												}
												buttonType={'button'}
											/>
										</div>
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ProductsPage;
