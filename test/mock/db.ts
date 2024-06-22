import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
	categories: {
		id: primaryKey(() => faker.string.uuid()),
		name: () => faker.commerce.product.name,
	},
	products: {
		id: primaryKey(() => faker.string.uuid()),
		name: () => faker.commerce.product.name,
		discount: () => faker.commerce.product.name,
		price: () => faker.commerce.product.name,
		category: () => faker.commerce.product.name,
		expiryDate: () => faker.commerce.product.name,
		status: () => faker.commerce.product.name,
		images: () => faker.helpers.arrayElement(['image1', 'image2', 'image3']),
	},
});
