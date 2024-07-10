import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/hooks';
import {
	closeModal,
	getSales,
} from '../../../../redux/features/Sales/AllSaleSlice';
import { updateOrder } from '../../../../redux/features/Sales/UpdateorderSlice';
import useToast from '../../../../hooks/useToast';
import { DynamicData } from '../../../../@types/DynamicData';

interface UpdateOrderFormValues {
	status: string;
	deliveryDate: string;
}

const UpdateOrderModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { selectedSaleId, deliveryDate, status, productName, productImage } =
		useAppSelector((state) => state.sales);
	const { isLoading } = useAppSelector((state) => state.updateOrder);

	const { showErrorMessage, showSuccessMessage } = useToast();

	const { register, handleSubmit } = useForm<UpdateOrderFormValues>({
		defaultValues: {
			status,
			deliveryDate: deliveryDate.split('T')[0],
		},
	});

	const onSubmit: SubmitHandler<UpdateOrderFormValues> = async (data) => {
		try {
			const resultAction = await dispatch(
				updateOrder({
					id: selectedSaleId ?? '',
					status: data.status,
					deliveryDate: data.deliveryDate,
				}),
			)
				.unwrap()
				.catch((error) => {
					showErrorMessage(error.message);
				});

			if (resultAction) {
				dispatch(closeModal());
				showSuccessMessage(resultAction.message);
				dispatch(getSales()).unwrap();
			}
		} catch (e) {
			const error = e as DynamicData;
			let errorMessage = 'An error occurred';
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				errorMessage = error.response.data.message;
			} else if (error.message) {
				errorMessage = error.message;
			}

			showErrorMessage(errorMessage);
		}
	};

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			dispatch(closeModal());
		}
	};

	return (
		<div
			className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-modalOverlay z-50"
			onClick={handleOverlayClick}
			data-testid="modal-overlay"
		>
			<div className="relative bg-neutral-white p-12 w-2/5 rounded-md min-w-fit">
				<button
					onClick={() => dispatch(closeModal())}
					className="absolute top-2 right-2 bg-action-error rounded-full py-1 px-3 text-lg text-neutral-white"
				>
					X
				</button>
				<div className="mb-4 text-center">
					<img
						src={productImage}
						alt={productName}
						className="w-40 h-32 mx-auto rounded-md"
					/>
					<h2 className="text-lg font-semibold">{productName}</h2>
					<p className="text-sm text-gray-600">Current Status: {status}</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="justify-between">
					<div className="mb-2">
						<label htmlFor="status" className="block text-sm font-medium">
							Status
						</label>
						<select
							id="status"
							{...register('status')}
							className="mt-1 block w-full pl-3 pr-10 py-2 border-2 text-base mobile:text-sm rounded-md"
						>
							<option value="pending" className="hidden">
								Pending
							</option>
							<option value="delivered">Delivered</option>
							<option value="canceled">Canceled</option>
						</select>
					</div>
					<div className="mb-2">
						<label htmlFor="deliveryDate" className="block text-sm font-medium">
							Delivery Date
						</label>
						<input
							type="date"
							id="deliveryDate"
							{...register('deliveryDate')}
							className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 mobile:text-sm rounded-md"
						/>
					</div>
					<div className="flex justify-end space-x-6 mt-4">
						<button
							type="button"
							onClick={() => dispatch(closeModal())}
							className="px-4 py-2 text-sm bg-action-error rounded-md text-neutral-white"
						>
							Cancel
						</button>

						<button
							type="submit"
							className="px-4 py-2 text-sm text-neutral-white bg-action-success rounded-md"
						>
							{isLoading ? 'Updating...' : 'Update'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateOrderModal;
