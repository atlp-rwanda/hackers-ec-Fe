import { useForm, SubmitHandler } from 'react-hook-form';
import {
	ForgotPasswordSchema,
	ForgotPasswordType,
} from '../../validations/forgottenPassword/forgotten.password.validation';
import { forgotPassword } from '../../redux/features/forgottonSlice';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import IconLoader from '../Loaders/IconLoader';
import { ChevronLeft } from 'lucide-react';

const ForgotPasswordForm = () => {
	const dispatch = useAppDispatch();
	const { showSuccessMessage, showErrorMessage } = useToast();
	const navigate = useNavigate();

	const handleNavigation = () => {
		navigate('/');
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordType>({
		resolver: zodResolver(ForgotPasswordSchema),
	});

	const onSubmit: SubmitHandler<ForgotPasswordType> = async (
		data: ForgotPasswordType,
	) => {
		try {
			const res = await dispatch(forgotPassword(data)).unwrap();
			showSuccessMessage(res.message);
			// navigate('/reset-password');
			// console.log('data from form****************** :', res);
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
		}
	};

	return (
		<>
			<form className="flex flex-col gap-9" onSubmit={handleSubmit(onSubmit)}>
				<input
					className="text-center border border-overlay w-full rounded-sm py-1 mobile:py-2"
					type="text"
					{...register('email')}
					placeholder="Enter your email here"
				/>
				{errors.email && (
					<p className="text-sm text-action-error text-center px-2">
						{errors.email.message}
					</p>
				)}

				<button
					disabled={isSubmitting}
					className="bg-action-success text-neutral-white py-1 w-full rounded-3xl flex justify-center gap-4 mobile:py-2 hover:bg-action-success/95"
				>
					{isSubmitting ? (
						<>
							<IconLoader className="animate-spin mr-1" /> {'Loading'}
						</>
					) : (
						'Continue'
					)}
				</button>
			</form>
			<button
				className="py-2 hover:bg-neutral-grey/20 rounded-3xl flex justify-center items-center gap-4 mobile:text-lg"
				onClick={handleNavigation}
			>
				<ChevronLeft size={18} />
				Return to site
			</button>
		</>
	);
};

export default ForgotPasswordForm;
