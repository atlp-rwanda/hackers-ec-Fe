import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import NotificationItem from '../../../src/components/cards/NotificationItem';
import notificationSlice from '../../../src/redux/features/notificationSlice';

const mockStore = configureStore({
	reducer: {
		notification: notificationSlice,
	},
});

const mockDispatch = vi.fn();
vi.mock('../../redux/hooks/hooks', () => ({
	useAppDispatch: () => mockDispatch,
}));

const mockShowErrorMessage = vi.fn();
vi.mock('../../../src/hooks/useToast', () => ({
	default: () => ({
		showErrorMessage: mockShowErrorMessage,
	}),
}));

const renderWithProviders = (ui: React.ReactElement) => {
	return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe('NotificationItem Component', () => {
	const mockProps = {
		text: 'This is a test notification',
		date: '2024-07-19',
		unread: true,
		id: '123',
	};

	const user = userEvent.setup();

	it('renders component', () => {
		renderWithProviders(<NotificationItem {...mockProps} />);
		expect(
			screen.getByText(/This is a test notification/i),
		).toBeInTheDocument();
	});

	it('displays "New" badge when notification is unread', () => {
		renderWithProviders(<NotificationItem {...mockProps} />);
		expect(screen.getByText(/New/i)).toBeInTheDocument();
	});

	it('does not display "New" badge when notification is read', () => {
		renderWithProviders(<NotificationItem {...mockProps} unread={false} />);
		expect(screen.queryByText(/New/i)).not.toBeInTheDocument();
	});

	it('toggles text length when "see more" or "show less" is clicked', async () => {
		renderWithProviders(
			<NotificationItem
				{...mockProps}
				text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, architecto recusandae nisi facere placeat consequatur incidunt illum iure saepe labore tempora. Ullam non tempore iste quos eveniet incidunt quo exercitationem!"
			/>,
		);
		const seeMore = screen.getByText(/see more/i);
		await user.click(seeMore);
		expect(screen.getByText(/show less/i)).toBeInTheDocument();
		await user.click(screen.getByText(/show less/i));
		expect(screen.getByText(/see more/i)).toBeInTheDocument();
	});

	it('calls dispatch to mark notification as read when clicked', async () => {
		renderWithProviders(<NotificationItem {...mockProps} />);
		const notificationItem = screen.getByText(/This is a test notification/i);
		await user.click(notificationItem);
		expect(screen.getByText(/notification/i)).toBeInTheDocument();
	});

	it('handles error during notification reading', async () => {
		mockDispatch.mockImplementationOnce(() => {
			throw Error('Error');
		});

		renderWithProviders(<NotificationItem {...mockProps} />);
		const notificationItem = screen.getByText(/This is a test notification/i);
		await user.click(notificationItem);

		await waitFor(() => {
			expect(mockShowErrorMessage).toHaveBeenCalledWith(
				'Unknown error occurred! Please try again!',
			);
		});
	});
});
