import useCheckwished from '../../hooks/useCheckWishlist';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { createWish } from '../../redux/features/createWishesSlice';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { fetchWishes } from '../../redux/features/getUserwishes';
type AddToWishType = {
	productId: string;
	btnCss?: string;
};
function AddToWish({ productId, btnCss }: AddToWishType) {
	const { wished, setWished } = useCheckwished(productId);
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();

	const handleAddRemoveWish = async () => {
		try {
			const res = await dispatch(createWish({ productId })).unwrap();
			await dispatch(fetchWishes()).unwrap();
			if (wished) {
				showSuccessMessage(res.message);
				setWished(!wished);
			} else {
				showSuccessMessage(res.message);
				setWished(!wished);
			}
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
		<div data-testid="addTowishlist" onClick={handleAddRemoveWish}>
			{wished ? (
				<FaHeart
					className={`${btnCss} text-action-error text-2xl cursor-pointer wish_btn`}
				/>
			) : (
				<FaRegHeart className={` ${btnCss} text-2xl cursor-pointer wish_btn`} />
			)}
		</div>
	);
}
export default AddToWish;
