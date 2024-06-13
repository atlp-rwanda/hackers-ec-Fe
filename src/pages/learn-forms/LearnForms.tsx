import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});
type FormFields = z.infer<typeof schema>;
// type FormFields = {
// 	email: string;
// 	password: string;
// };

export const LearnForms = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

	// This is just have value of FormFiled not for event listen
	const onSubmit: SubmitHandler<FormFields> = (data) => {
		console.log(data);
	};

	return (
		<>
			{/* This handle */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('email')}
					className="border-spacing-1 border-action-success border"
					type="text"
					placeholder="email"
				/>
				{errors.email && (
					<div className="text-action-error">{errors.email.message}</div>
				)}
				<br />
				<br />
				<input
					{...register('password')}
					className="border-spacing-1 border-action-success border"
					type="password"
					placeholder="password"
				/>

				{errors.password && (
					<div className="text-action-error">{errors.password.message}</div>
				)}
				<br />
				<br />
				<button type="submit" className="border p-1">
					Submit
				</button>
			</form>
		</>
	);
};
