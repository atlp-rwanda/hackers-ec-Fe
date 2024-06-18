import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
	categories: {
		id: primaryKey(() => faker.string.uuid()),
		name: () => faker.commerce.product.name,
	},
});
