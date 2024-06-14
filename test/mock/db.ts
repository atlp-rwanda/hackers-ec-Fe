import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
	categories: {
		id: primaryKey(() => faker.string.uuid()),
		name: () => faker.commerce.product.name,
	},
	users: {
		id: primaryKey(() => faker.string.uuid()),
		firstName: () => faker.internet.userName(),
		lastName: () => faker.internet.userName(),
		email: () => faker.internet.email(),
		Active: () => faker.helpers.arrayElement(['Active', 'isActive']),
		role: () => faker.helpers.arrayElement(['ADMIN', 'BUYER', 'SELLER']),
	},
	roles: {
		id: primaryKey(() => faker.string.uuid()),
		roleName: () => faker.internet.userName(),
	},
});
