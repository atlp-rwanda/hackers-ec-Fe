/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface fetchUserType {
	page?: number;
	search?: string;
}

interface UsersState {
	data: DynamicData[];
	isLoading: boolean;
	error: string | null;
}

const initialState: UsersState = {
	data: [],
	isLoading: false,
	error: null,
};

export const getUserPag = createAsyncThunk(
	'fetchUser',
	async ({ page, search }: fetchUserType, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/users', {
				params: { page, search: search },
			});
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const getUserPagSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserPag.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getUserPag.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.data = [...state.data, action.payload];
				state.error = null;
			},
		);
		builder.addCase(
			getUserPag.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
	},
});

export default getUserPagSlice.reducer;
