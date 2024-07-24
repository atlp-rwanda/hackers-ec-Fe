/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface LogoutState {
	isLoading: boolean;
	error: string | null;
	isLoggedOut: boolean;
}

export const Logout = createAsyncThunk(
	'logout',
	async (_, { rejectWithValue }) => {
		try {
			const res = await API.post('/users/logout');
			localStorage.removeItem('access_token');
			return res.data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: LogoutState = {
	isLoading: false,
	error: null,
	isLoggedOut: false,
};

const logoutSlice = createSlice({
	name: 'logout',
	initialState,
	reducers: {
		resetLogoutState: (state) => {
			state.isLoading = false;
			state.error = null;
			state.isLoggedOut = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(Logout.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			state.isLoggedOut = false;
		});

		builder.addCase(Logout.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
			state.isLoggedOut = true;
		});

		builder.addCase(Logout.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error =
				action.payload?.data?.message || 'An error occurred while logging out';
		});
	},
});

export const { resetLogoutState } = logoutSlice.actions;

export default logoutSlice.reducer;
