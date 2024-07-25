import { z } from 'zod';

export const categorySchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3, { message: 'category name required!' }),
	description: z.string().min(3, { message: 'Description required!' }),
});

export type categorySchemaType = z.infer<typeof categorySchema>;
