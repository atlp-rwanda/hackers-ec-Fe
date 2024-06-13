import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
	ResetPasswordSchema,
	ResetPasswordSchemaType,
} from '../../validations/resetPassword/reset.password.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import IconLoader from '../Loaders/IconLoader';
import { ChevronLeft } from 'lucide-react';

const ResetPasswordForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit: SubmitHandler<ResetPasswordSchemaType> = (data) => {
		console.log(data);
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
