import { DynamicData } from '../../@types/DynamicData';
import Button from '../buttons/Button';
import { RiDeleteBinFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import DeleteModal from '../Deletemodal';
import ProductPageAddToCart from '../carts/ProductPageAddToCart';

interface wishType {
	wishes: DynamicData;
	activeDeleteModal: string;
	setActiveDeleteModal: (D: string) => void;
}
const WishListComp = ({
	wishes,
	activeDeleteModal,
	setActiveDeleteModal,
}: wishType) => {
	return (
		<>
			<div className="w-full ">
				<div
					className={` ${!wishes ? 'flex flex-1 justify-end items-center' : 'grid mobile:grid-cols-2 laptop:grid-cols-3 gap-10'} product_card_container max-h-[95vh] overflow-hidden overflow-y-scroll ipad:overflow-y-hidden h-full py-2 place-items-center `}
				>
					{wishes &&
						wishes.map((item: DynamicData, idx: number) => (
							<div key={idx}>
								<motion.div
									className="product_card bg-neutral-white p-4 flex flex-col rounded-md shadow laptop:max-w-[83%] h-full m-auto"
									initial={{ opacity: 0, scale: 0.2 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.3 }}
									whileHover={{
										boxShadow: '0px 0px 8px rgba(0,0,0)',
										scaleX: 1.1,
									}}
								>
									<div className="card_profile p-2 w-full flex-grow">
										<div className="w-full h-48 relative">
											<div className="w-full overflow-hidden flex shadow h-48">
												<img
													src={item.product.images && item.product.images[0]}
													alt="card_profile"
													className="rounded-lg w-[15rem] h-48 tablet:w-[17rem] tablet:h-50 object-cover"
												/>
											</div>
											<ProductPageAddToCart productId={item.productId} />

											<div
												data-testid="show-delete-modal"
												className="discount absolute p-1 rounded text-action-error right-1 top-0 font-bold text-[25px]"
											>
												<button
													onClick={() =>
														setActiveDeleteModal(
															item.productId || activeDeleteModal,
														)
													}
												>
													<RiDeleteBinFill />
												</button>
											</div>
										</div>
									</div>
									<div className="card_description pl-2 flex-grow">
										<h1 className="py-2">
											{item.product.name.length > 20
												? item.product.name.slice(0, 20) + '...'
												: item.product.name}
										</h1>

										<div className="price_wish flex justify-between items-center mt-2 gap-2 flex-wrap py-2">
											<h1 className="text-2xl font-bold">
												{item.product.price}
												<small className="text-base font-normal"> RWF</small>
											</h1>
										</div>
									</div>
									<div className="btn flex justify-center">
										<Button
											title="preview product"
											url={`/products/${item.productId}`}
											otherStyles={
												' rounded-l-full rounded-r-full mt-2 font-semibold'
											}
											buttonType={'button'}
										/>
									</div>
								</motion.div>
								{activeDeleteModal === item.productId && (
									<DeleteModal
										setDeleteModal={setActiveDeleteModal}
										productId={item.productId}
									/>
								)}
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default WishListComp;
