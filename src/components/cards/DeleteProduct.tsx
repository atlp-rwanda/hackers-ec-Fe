import { useContext, useState } from 'react';
import { IoAlertCircle } from 'react-icons/io5';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { deleteProduct, getProducts } from '../../redux/features/productSlice';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { modalContext } from './SellerProductsModal';

interface DeleteModalProps {
	item: DynamicData;
	handleChange: (idx: string) => void;
}

const DeleteProduct = ({ item }: DeleteModalProps) => {
	const [loading, setLoading] = useState(false);
	const { showErrorMessage, showSuccessMessage } = useToast();
	const dispatch = useAppDispatch();
	const handleDelete = async (id: string) => {
		if (id) {
			try {
				setLoading(true);
				const res = await dispatch(deleteProduct(id)).unwrap();
				showSuccessMessage(res?.message || 'Product deleted successfully');
				dispatch(getProducts());
				changeModal();
				setLoading(false);
			} catch (error) {
				changeModal();
				const err = error as DynamicData;
				showErrorMessage(
					err?.data?.message ||
						err?.message ||
						'Unknown error occurred! Please try again!',
				);
			}
		}
	};
	const { changeModal } = useContext(modalContext) as {
		changeModal: () => void;
	};

	return (
		<div className="modal_wrapper bg-neutral-black/20 fixed inset-0 flex items-center justify-center">
			<div className="modal_container   bg-neutral-white text-neutral-black p-4 rounded-md _shadow flex flex-col gap-5">
				<h1 className="flex items-center gap-2">
					<IoAlertCircle className="text-2xl text-[#FAAD14] rounded-full" />{' '}
					Delete products
				</h1>
				<h1 className="text-center font-semibold text-lg">
					Are you sure you want to delete this?
				</h1>

				<div className="buttons h- w-full flex items-center justify-end gap-5">
					<button
						className="confirm text-sm px-4 py-1 text-neutral-white font-semibold bg-primary-lightblue rounded-md cursor-pointer"
						onClick={() => {
							handleDelete(item.id);
						}}
					>
						{loading ? 'Deleting...' : 'Yes'}
					</button>
					<button
						className="cancel  text-sm rounded-md font-semibold px-4 py-1 border border-action-error cursor-pointer"
						onClick={() => changeModal()}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteProduct;
