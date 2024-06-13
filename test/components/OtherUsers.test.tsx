import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import OtherUsers from '../pages/OtherUsers';
import { RootState } from '../redux/store';

interface Action {
	type: string;
}

const initialState: RootState = {
	users: {
		data: [],
		loading: false,
		error: null,
	} as RootState['users'],
};

const mockReducer = (state = initialState, action: Action): RootState => {
	switch (action.type) {
		default:
			return state;
	}
};

describe('OtherUsers component', () => {
	test('renders user names correctly', () => {
		const users = [
			{ id: 1, name: 'User 1' },
			{ id: 2, name: 'User 2' },
			{ id: 3, name: 'User 3' },
		];

		const store: Store = createStore(mockReducer, {
			users: { data: users, loading: false, error: null },
		});

		render(
			<Provider store={store}>
				<OtherUsers />
			</Provider>,
		);

		users.forEach((user) => {
			const userNameElement = screen.getByText(user.name);
			expect(userNameElement).toBeInTheDocument();
		});
	});
});
