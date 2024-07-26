import { z } from 'zod';

const allowedNumbers = [
	'46733123450',
	'46733123451',
	'46733123452',
	'46733123453',
	'46733123454',
	'46733123455',
	'46733123456',
	'46733123457',
	'46733123458',
];

export const momoValidation = z.object({
	phoneNumber: z.union([
		z.string().refine((val) => allowedNumbers.includes(val), {
			message: 'Invalid phone number',
		}),
		z.string().regex(/^(078|079)\d{7}$/, {
			message: 'Phone must start with 078 or 079 and be 10 digits long',
		}),
	]),
});

export type momoValidationType = z.infer<typeof momoValidation>;
