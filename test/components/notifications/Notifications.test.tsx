/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import Notification from '../../../src/components/notification/Notification';
import AllProvider from '../../Utils/AllProvider';
import userEvent from '@testing-library/user-event';
import { addNotification } from '../../../src/redux/features/notificationSlice';
import { store } from '../../../src/redux/store';
import { toast } from 'sonner';
import { DynamicData } from '../../../src/@types/DynamicData';

vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() =>
	Promise.resolve(),
);

vi.mock('sonner', () => ({
	toast: {
		error: vi.fn(),
		success: vi.fn(),
	},
}));

describe('Notification component', () => {
	const renderComponent = () => {
		render(<Notification />, { wrapper: AllProvider });
		return {
			user: userEvent.setup(),
			bell: screen.getByRole('img'),
		};
	};

	it('should render a notification component with a bell icon', () => {
		const { bell } = renderComponent();
		expect(bell).toBeInTheDocument();
	});

	it('should show notification tab when a user clicks on the bell', async () => {
		const notification = {
			id: '1',
			message: 'Test Notification',
			unread: true,
			createdAt: new Date().toISOString(),
		};
		store.dispatch(addNotification(notification));

		const { bell, user } = renderComponent();
		await user.click(bell);
		expect(screen.getByLabelText('notification-tab')).toBeInTheDocument();
		expect(screen.getByText('Test Notification')).toBeInTheDocument();
	});

	it('should show a toast when a new message is received', async () => {
		const { bell, user } = renderComponent();
		const socket = require('socket.io-client')(
			import.meta.env.VITE_API_APP_ROOT_URL,
		);

		socket.emit('notification-user1', {
			id: '2',
			message: 'New Notification',
			unread: true,
			createdAt: new Date().toISOString(),
		});

		const notificatioNber = screen.getByLabelText('notification-number');
		expect(notificatioNber).toHaveTextContent('1');

		await user.click(bell);

		const notificationCard = screen.getByText(/new/i);
		await user.click(notificationCard);
	});

	it('should handle errors in readAllNotification function', async () => {
		const { bell, user } = renderComponent();
		await user.click(bell);
		const markButton = screen.getByLabelText('mark-button');
		vi.spyOn(store, 'dispatch').mockImplementationOnce(() => {
			throw new Error('Error');
		});
		await user.click(markButton);
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				'Unknown error occurred! Please try again!',
			);
		});
	});
	it('should handle errors in readAllNotification function', async () => {
		const { bell, user } = renderComponent();
		await user.click(bell);
		const markButton = screen.getByLabelText('mark-button');
		const error = { data: { message: 'Test error' } };
		(vi.spyOn(store, 'dispatch') as DynamicData).mockImplementation(() => {
			return {
				unwrap: () => Promise.reject(error),
			};
		});
		await user.click(markButton);
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				'Unknown error occurred! Please try again!',
			);
		});
	});
});
