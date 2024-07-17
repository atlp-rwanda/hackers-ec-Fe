import { HttpHandler } from 'msw';
import { db } from './db';

export const handlers: HttpHandler[] = [
	...db.categories.toHandlers('rest'),
	...db.sales.toHandlers('rest'),
	...db.stats.toHandlers('rest'),
];
