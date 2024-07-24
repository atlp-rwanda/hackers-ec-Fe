/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { DynamicData } from '../../@types/DynamicData';

export const getAdminStats = createAsyncThunk(
	'statistic',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/admin/stats');
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const initialState: DynamicData = {
	isLoading: false,
	data: null,
	error: null,
};

const adminStatisticSlice = createSlice({
	name: 'statistic',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAdminStats.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getAdminStats.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.error = null;
				state.isLoading = false;
			},
		);
		builder.addCase(
			getAdminStats.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});
export default adminStatisticSlice.reducer;
