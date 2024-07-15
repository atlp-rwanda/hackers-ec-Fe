/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../utils/api';
import PaymentSuccessResponse from '../../@types/payment/PaymentSuccessResponse';
import { DynamicData } from '../../@types/DynamicData';
interface PoidOrderInitialState {
	isLoading: boolean;
	data: PaymentSuccessResponse | null;
	message: string | null;
	error: string | null;
}

interface PaidOrderParams {
	sessionId: string;
	payerId: string;
}

export const paidOrder = createAsyncThunk(
	'paidOrder',
	async ({ sessionId, payerId }: PaidOrderParams, { rejectWithValue }) => {
		try {
			const { data } = await API.get(
				`/payments/success?sessionId=${sessionId}&payerId=${payerId}`,
			);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: PoidOrderInitialState = {
	isLoading: false,
	data: null,
	message: null,
	error: null,
};

const PaidOrderSlice = createSlice({
	name: 'paidOrder',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(paidOrder.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(paidOrder.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
			state.message = action.payload?.message;
			state.error = null;
		});

		builder.addCase(paidOrder.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload?.data?.message;
		});
	},
});

export default PaidOrderSlice.reducer;
