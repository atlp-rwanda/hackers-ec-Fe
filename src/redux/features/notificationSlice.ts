import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

type NotificationState = {
	notifications: Array<DynamicData> | null;
	value: number;
	isLoading: boolean;
};

const initialState: NotificationState = {
	notifications: [],
	value: 0,
	isLoading: false,
};

export const markAllRead = createAsyncThunk(
	'readAllNotification',
	async (_, { rejectWithValue }) => {
		try {
			await API.patch('/notifications');
		} catch (error) {
			return rejectWithValue((error as DynamicData).message);
		}
	},
);

export const markOneRead = createAsyncThunk(
	'readOneNotification',
	async (id: string, { rejectWithValue }) => {
		try {
			await API.patch(`/notifications/${id}`);
		} catch (error) {
			return rejectWithValue((error as DynamicData).message);
		}
	},
);

const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		userNotification: (state, action: PayloadAction<Array<DynamicData>>) => {
			state.notifications = action.payload;
			state.value = action.payload.filter(
				(data) => data?.unread === true,
			).length;
		},
		addNotification: (state, action: PayloadAction<DynamicData>) => {
			state.notifications = [action.payload, ...state.notifications!];
			state.value += 1;
		},
		readOneNotification: (state, action: PayloadAction<string>) => {
			state.notifications = state.notifications?.map((notification) => {
				if (notification.id === action.payload) {
					if (notification.unread) {
						state.value -= 1;
					} else {
						state.value += 1;
					}
					return { ...notification, unread: !notification.unread };
				}
				return notification;
			}) as DynamicData[];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(markAllRead.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(markAllRead.fulfilled, (state) => {
			state.value = 0;
			state.notifications = state.notifications?.map((notification) => ({
				...notification,
				unread: false,
			})) as DynamicData[];
			state.isLoading = false;
		});
		builder.addCase(markAllRead.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { userNotification, addNotification, readOneNotification } =
	notificationSlice.actions;

export default notificationSlice.reducer;
