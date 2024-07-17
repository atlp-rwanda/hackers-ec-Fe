/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { statisticsState } from '../../@types/StatisticsTypes';
import API from '../../utils/api';

export const getStats = createAsyncThunk(
	'statistics',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/stats');
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const initialState: statisticsState = {
	isLoading: false,
	data: null,
	error: null,
	lossPercent: 0,
	expiredProductPercent: 0,
};

const statisticSlice = createSlice({
	name: 'statistics',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getStats.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getStats.fulfilled, (state, action: PayloadAction<any>) => {
			state.data = action.payload.data;
			state.error = null;
			state.lossPercent =
				action.payload.data?.loss / action.payload.data?.allProductsValue;
			state.expiredProductPercent =
				action.payload.data?.numberOfExpiredProducts /
				action.payload.data?.totalProducts;
			state.isLoading = false;
		});
		builder.addCase(getStats.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload?.data?.message;
		});
	},
});

export default statisticSlice.reducer;
