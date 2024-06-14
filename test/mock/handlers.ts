import { HttpHandler } from 'msw';
import { db } from './db';

export const handlers: HttpHandler[] = [...db.users.toHandlers('rest')];
