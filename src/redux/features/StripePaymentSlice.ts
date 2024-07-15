/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { stripeState } from '../../@types/payment/stripePaymentTypes';

export const stripePayment = createAsyncThunk(
	'stripePayment',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.post('/payments?method=stripe');
			return data;
		} catch (error) {
			const { response } = error as { response: any };
			return rejectWithValue(response);
		}
	},
);

const initialState: stripeState = {
	isLoading: false,
	data: null,
	error: null,
};

const stripePaymentSlice = createSlice({
	name: 'stripePayment',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(stripePayment.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(stripePayment.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(
			stripePayment.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload.data.message;
			},
		);
	},
});

export default stripePaymentSlice.reducer;
