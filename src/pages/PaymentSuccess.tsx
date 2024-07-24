import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { paidOrder } from '../redux/features/PaidOrderSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

import useToast from '../hooks/useToast';

function PaymentSuccess() {
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get('sessionId')!;
	const payerId = searchParams.get('payerId')!;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { showSuccessMessage } = useToast();

	const { data, isLoading, message } = useAppSelector(
		(state) => state.userOrder,
	);
	useEffect(() => {
		if (!data) {
			dispatch(paidOrder({ sessionId, payerId }));
		}
	}, [data, dispatch, payerId, sessionId]);

	useEffect(() => {
		if (!isLoading && data?.data.order.id) {
			navigate(`/orders/${data.data.order.id}`);
			showSuccessMessage(message as string);
		}
	}, [isLoading, data, navigate, showSuccessMessage, message]);

	return (
		<>
			{isLoading ? (
				<div className="w-full h-full flex items-center justify-center absolute">
					<ScaleLoader color="#256490" role="progressbar" />
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default PaymentSuccess;
