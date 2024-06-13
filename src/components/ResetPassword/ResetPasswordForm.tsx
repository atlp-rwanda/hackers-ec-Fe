import { SubmitHandler, useForm } from 'react-hook-form';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
	ResetPasswordPayload,
	ResetPasswordSchema,
	ResetPasswordSchemaType,
} from '../../validations/resetPassword/reset.password.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import IconLoader from '../Loaders/IconLoader';
import { ChevronLeft } from 'lucide-react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import useToast from '../../hooks/useToast';
import { resetPassword } from '../../redux/features/resetSlice';
import { DynamicData } from '../../@types/DynamicData';

const ResetPasswordForm = () => {
	// const token = useLocation();
	// console.log('token', token.search.substring(7));
	const dispatch = useAppDispatch();
	const { showSuccessMessage, showErrorMessage } = useToast();

	// FORM
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit: SubmitHandler<ResetPasswordPayload> = async (data) => {
		console.log('form data', data);
		try {
			const { password } = data;
			const res = await dispatch(resetPassword({ password })).unwrap();
			showSuccessMessage(res.message);
			console.log('***************************', res);
		} catch (e) {
			const err = e as DynamicData;
			console.log(
				'error',
				err?.data?.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
		}
	};

	const navigate = useNavigate();
	const handleNavigation = () => {
		navigate('/');
	};

	return (
		<>
			<form className=" flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('password')}
					className="text-center border border-overlay w-full rounded-sm py-1 mobile:py-2"
					type="password"
					placeholder="Password"
				/>

				{errors.password && (
					<p className="text-sm text-action-error px-2">
						{errors.password.message}
					</p>
				)}
				<input
					{...register('confirmPassword')}
					className="text-center border border-overlay w-full rounded-sm py-1 mobile:py-2"
					type="password"
					placeholder="Confirm Password"
				/>

				{errors.confirmPassword && (
					<p className="text-sm text-action-error text-center px-2">
						{errors.confirmPassword.message}
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
						'Confirm'
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

export default ResetPasswordForm;
