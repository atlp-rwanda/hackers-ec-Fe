import { DynamicData } from './DynamicData';

export type NotificationItemTypes = {
	isSelected?: boolean;
	text: string;
	date: string;
	unread: boolean;
	id: string;
};

export type NotificationProps = {
	active: boolean;
	notifications: Array<DynamicData>;
};

export interface NotificationTypes {
	id: string;
	message: string;
	unread: boolean;
	userId: string;
	createdAt: Date;
}
