import { motion } from 'framer-motion';
import { LiaTimesSolid } from 'react-icons/lia';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useAppDispatch } from '../redux/hooks/hooks';
import useToast from '../hooks/useToast';
import { createWish } from '../redux/features/createWishesSlice';
import { fetchWishes } from '../redux/features/getUserwishes';
import { DynamicData } from '../@types/DynamicData';

interface DeleteModalType {
	setDeleteModal: (D: string) => void;
	productId: string;
}
function DeleteModal({ setDeleteModal, productId }: DeleteModalType) {
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();
	const handleAddRemoveWish = async (productId: string) => {
		try {
			const res = await dispatch(createWish({ productId })).unwrap();
			showSuccessMessage(res.message);
			await dispatch(fetchWishes()).unwrap();
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};
	return (
		<div>
			<>
				<div
					className="fixed w-full h-full bg-neutral-black bg-opacity-45 top-0 left-0 z-[100]"
					onClick={() => setDeleteModal('')}
				></div>
				<motion.div
					initial={{ opacity: 0, scale: 0.2 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.1 }}
					className="overflow-y-auto overflow-x-hidden fixed top-[30%] mobile:top-[40%] mobile:left-[25%] ipad:left-[35%] right-0 left-0 z-[150] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
				>
					<div className="relative  px-4 w-full max-w-[23rem] max-h-full bg-action-sucess">
						<div className=" py-5 bg-neutral-white rounded-lg shadow dark:bg-gray-700">
							<div className="flex px-4  bg-actio-success text-[2rem]">
								<RiDeleteBinFill className=" text-action-error" />
								<button
									type="button"
									className=" bg-transparent   ms-auto"
									onClick={() => setDeleteModal('')}
								>
									<LiaTimesSolid className="" />
								</button>
							</div>
							<div className="px-4 text-cnter mt9">
								<h2 className="flex text-[1.3rem] pt-[15px] pb-[2px] font-bold">
									Delete Wishes
								</h2>
								<h3 className="mb-5 text-[1rem] font-normal text-neutral-grey dark:text-gray-400">
									Are you sure you want to delete this wish?
								</h3>
								<button
									type="button"
									className="text-neutral-white bg-action-error bg-opacity-90 hover:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-2 bimobile:px-5 py-2.5 text-center"
									onClick={() => {
										handleAddRemoveWish(productId);
										setDeleteModal('');
									}}
								>
									Yes, I'm sure
								</button>
								<button
									type="button"
									className="py-2.5 px-2  bimobile:px-5 ms-12 text-sm  hover:ring-4 font-medium focus:outline-none  rounded-lg border  hover:text-blue-700 focus:z-10 focus:ring-4 "
									onClick={() => setDeleteModal('')}
								>
									No, cancel
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			</>
		</div>
	);
}

export default DeleteModal;
