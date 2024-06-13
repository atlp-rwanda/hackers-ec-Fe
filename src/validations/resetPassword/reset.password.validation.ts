import { z } from 'zod';

export const ResetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(1, { message: 'Password can not be empty' })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
				message:
					'Password must be at least 8 characters long and include a lowercase letter & uppercase letters, and a digit.',
			}),
		confirmPassword: z
			.string()
			.min(1, { message: 'Confirm password can not be empty.' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password do not match',
		path: ['confirmPassword'],
	});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export type ResetPasswordPayload = Pick<ResetPasswordSchemaType, 'password'>;
