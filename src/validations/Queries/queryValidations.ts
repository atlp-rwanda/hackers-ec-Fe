import z from 'zod';

export const queryValidation = z.object({
	id: z.string().optional(),
	firstName: z.string().min(1, "First Name field can't be empty!"),
	lastName: z.string().min(1, "Last Name field can't be empty!"),
	subject: z.string().min(1, "Subject field can't be empty!"),
	email: z.string().email('Invalid email address!'),
	message: z.string().min(1, "Message field can't be empty!"),
});

export type queryTypes = z.infer<typeof queryValidation>;
