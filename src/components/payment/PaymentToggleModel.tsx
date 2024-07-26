/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import momoIcon from '../../assets/momo.png';
import PaymentButton from '../buttons/PaymentButton';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { stripePayment } from '../../redux/features/StripePaymentSlice';
import stripeIcon from '../../assets/stripe icon.png';
import cancel from '../../assets/cancel.png';
import { payModel } from '../../redux/features/toggleSlice';
import useToast from '../../hooks/useToast';
import FormInput from '../Forms/InputText';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeLoader } from 'react-spinners';
import CopyCard from '../buttons/CopyCard';
import {
	momoValidation,
	momoValidationType,
} from '../../validations/momValidation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicData } from '../../@types/DynamicData';
import { momoPay, resetMomo } from '../../redux/features/momoPaymentSlice';
import IconLoader from '../Loaders/IconLoader';
import { useNavigate } from 'react-router-dom';
import { getCarts } from '../../redux/features/cartSlice';

const initialCopyData = { token: '', referenceId: '' };
function PaymentToggleModel() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [current, setCurrent] = useState(0);
	const [previousStep, setPreviousStep] = useState(0);
	const [copyData, setCopyData] = useState(initialCopyData);
	const { showErrorMessage, showSuccessMessage } = useToast();
	const { data, isLoading, error } = useAppSelector((state) => state.stripe);
	let {
		data: momoData,
		isLoading: processing,
		error: momoError,
		paymentStatus,
		message,
	} = useAppSelector((state) => state.momo);
	const difference = current - previousStep;

	const paymentToggleModel = (): boolean => {
		dispatch(payModel());
		return true;
	};

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<momoValidationType>({
		resolver: zodResolver(momoValidation),
	});

	useEffect(() => {
		if (!data) {
			dispatch(stripePayment()).unwrap();
		}
	}, [data, dispatch]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let interval: any;
		const checkPayment = async () => {
			try {
				await handleSubmit(handleMomoPay)();
			} catch (e) {
				showErrorMessage('Error checking payment status');
			}
		};

		if (
			!processing &&
			(paymentStatus === 'PENDING' || paymentStatus === 'SUCCESSFUL')
		) {
			interval = setInterval(async () => {
				await checkPayment();
			}, 10000);
		}

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getValues, handleSubmit, paymentStatus, processing]);

	useEffect(() => {
		if (error || momoError) {
			showErrorMessage(error || (momoError as string));
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, momoError]);

	const handleStripePayment = () => {
		const url: string = data?.data.sessionUrl || '';
		window.location.href = url;
	};

	const handleCancel = () => {
		reset();
		dispatch(resetMomo());
		setPreviousStep(1);
		setCurrent(0);
	};

	const handleMomoPay: SubmitHandler<momoValidationType> = async (
		data: momoValidationType,
	) => {
		try {
			const res = await dispatch(momoPay(data)).unwrap();
			paymentStatus = res?.status;
			momoData = res?.data;
			message = res?.message;
			if (!processing && paymentStatus) {
				if (paymentStatus === 'SUCCESSFUL') {
					if (momoData) {
						showSuccessMessage(message!);
						navigate(`/orders/${momoData?.order?.id}`);
						dispatch(getCarts());
						reset();
						dispatch(resetMomo());
						paymentToggleModel();
					}
				}
				if (paymentStatus === 'PENDING') {
					setCopyData({
						token: momoData?.token,
						referenceId: momoData?.XReferenceId,
					});
					setPreviousStep(1);
					setCurrent(2);
				} else if (paymentStatus === 'FAILED') {
					showErrorMessage(`${message}(${momoData as unknown as string})`);
					reset();
					dispatch(resetMomo());
					setPreviousStep(1);
					setCurrent(0);
				}
			}
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
			reset();
			setPreviousStep(1);
			setCurrent(0);
		}
	};

	return (
		<div className="flex fixed bg-neutral-grey justify-center items-center bg-fixed bg-opacity-[0.8] w-screen h-screen z-50">
			<div className="w-[90%] tablet:w-[60%] h-[50%] rounded-[2rem] shadow-bottom-left-right bg-neutral-white opacity-1 tablet:py-12 overflow-hidden">
				{current === 0 && (
					<motion.div
						initial={
							previousStep === 0
								? false
								: { x: difference >= 0 ? '50%' : '-50%', opacity: 1 }
						}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="w-full h-full flex justify-around items-center flex-col"
					>
						<h1 className="text-xl font-semibold">Continue payment with:</h1>
						<PaymentButton
							bgColor="bg-action-warning text-neutral-white"
							icon={momoIcon}
							title="Mobile Money"
							handlePayment={() => {
								setPreviousStep(0);
								setCurrent(1);
							}}
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
					</motion.div>
				)}
				{current === 1 && (
					<motion.div
						initial={{ x: difference >= 0 ? '50%' : '-50%', opacity: 1 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="flex flex-col items-center justify-center gap-4 w-full h-full"
					>
						<h1 className="text-xl font-semibold">Enter Phone number</h1>
						<p className="w-[70%] text-xs text-center my-5">
							Sorry, this momo payment is not yet launched, you will need to
							approve this payment using sandbox on momo API.
						</p>
						<form action="" onSubmit={handleSubmit(handleMomoPay)}>
							<FormInput
								type="text"
								placeholder="Enter phone number"
								otherStyles="text-center py-2 px-10 mt-2 border !bg-transparent mb-5"
								{...register('phoneNumber')}
								onChange={(e) => setValue('phoneNumber', e.target.value)}
								error={errors.phoneNumber}
							/>
							<button
								type="submit"
								className="w-full border bg-action-warning text-white py-2 rounded-full flex items-center justify-center gap-2"
							>
								{processing ? (
									<>
										<IconLoader className="animate-spin mr-1" />{' '}
										{'processing....'}
									</>
								) : (
									'Pay'
								)}
							</button>
						</form>
						<button
							type="button"
							className="flex items-center justify-center gap-2"
							onClick={handleCancel}
						>
							<ChevronLeft size={18} /> Cancel
						</button>
					</motion.div>
				)}
				{current === 2 && (
					<motion.div
						initial={{ x: difference >= 0 ? '50%' : '-50%', opacity: 1 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className="w-full h-full flex items-center justify-center flex-col gsp-4"
					>
						<FadeLoader color="green" />
						<p className="w-[70%] text-xs text-center my-5">
							Use this endpoint to approve:{' '}
							<a
								href="https://momodeveloper.mtn.com/API-collections#api=collection&operation=GetPaymentStatus"
								target="_blank"
								rel="noopener noreferrer"
								className="text-yellow-600"
							>
								momo API
							</a>
							. Copy the needed credentials below!
						</p>
						<div className="grid grid-cols-2 gap-4 p-3">
							<CopyCard
								name="Authorization token"
								text="Authorization token"
								value={copyData.token}
							/>
							<CopyCard
								name="Target Environment"
								text="Target Environment"
								value="sandbox"
							/>
							<CopyCard
								name="XReferenceId"
								text="XReferenceId"
								value={copyData.referenceId}
							/>
							<CopyCard
								name="Ocp-Apim-Subscription-Key"
								text="Ocp-Apim-Subscription-Key"
								value={import.meta.env.VITE_OCP_SUBSCRIPTION_KEY}
							/>
						</div>
						<button
							type="button"
							className="flex items-center justify-center gap-2"
							onClick={handleCancel}
						>
							<ChevronLeft size={18} /> Cancel
						</button>
					</motion.div>
				)}
			</div>
		</div>
	);
}

export default PaymentToggleModel;
