import { useEffect } from 'react';
import momoIcon from '../../assets/momo.png';
import PaymentButton from '../buttons/PaymentButton';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { stripePayment } from '../../redux/features/StripePaymentSlice';
import stripeIcon from '../../assets/stripe icon.png';
import cancel from '../../assets/cancel.png';
import { payModel } from '../../redux/features/toggleSlice';
import useToast from '../../hooks/useToast';

function PaymentToggleModel() {
	const { data, isLoading, error } = useAppSelector((state) => state.stripe);
	const paymentToggleModel = (): boolean => {
		dispatch(payModel());
		return true;
	};
	const { showErrorMessage } = useToast();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (!data) {
			dispatch(stripePayment()).unwrap();
		}
	}, [data, dispatch]);
	if (error) {
		showErrorMessage(error);
	}
	const handleStripePayment = () => {
		const url: string = data?.data.sessionUrl || '';
		window.location.href = url;
	};
	return (
		<div className="flex fixed bg-neutral-grey justify-center items-center bg-fixed bg-opacity-[0.8] w-screen h-screen z-50">
			<div className="w-[90%] tablet:w-[60%] h-[50%] rounded-[2rem] shadow-bottom-left-right bg-neutral-white opacity-1 flex justify-around items-center flex-col tablet:py-12">
				<h1 className="text-xl font-semibold">Continue payment with:</h1>
				<PaymentButton
					bgColor="bg-action-warning text-neutral-white"
					icon={momoIcon}
					title="Mobile Money"
				/>
				<PaymentButton
					handlePayment={handleStripePayment}
					bgColor="bg-[#6A39BA] text-neutral-white"
					icon={stripeIcon}
					title="Stripe"
					disable={isLoading}
				/>
				<PaymentButton
					handlePayment={paymentToggleModel}
					bgColor="bg-neutral-white"
					icon={cancel}
					title="Cancel"
					iconSize="w-[1rem]"
				/>
			</div>
		</div>
	);
}

export default PaymentToggleModel;
