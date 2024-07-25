/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

type InitialStateType = {
	isLoading: boolean;
	error: null | string;
	message: null | string;
	paymentStatus: null | string;
	data: null | DynamicData;
};

const initialState: InitialStateType = {
	isLoading: false,
	error: null,
	message: null,
	paymentStatus: null,
	data: null,
};

export const momoPay = createAsyncThunk(
	'momo',
	async ({ phoneNumber }: { phoneNumber: string }, { rejectWithValue }) => {
		try {
			console.log(phoneNumber);
			const { data } = await API.post('/payments?method=momo', { phoneNumber });
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const momoSlice = createSlice({
	name: 'momo',
	initialState,
	reducers: {
		changePaymentStatus: (state) => {
			state.paymentStatus = 'CANCELLED';
		},
		resetMomo: (state) => {
			state.data = null;
			state.error = null;
			state.isLoading = false;
			state.message = null;
			state.paymentStatus = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(momoPay.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			momoPay.fulfilled,
			(
				state,
				action: PayloadAction<{ data: any; message: string; status: string }>,
			) => {
				state.isLoading = false;
				state.data = action.payload?.data;
				state.message = action.payload?.message;
				state.paymentStatus = action.payload?.status;
			},
		);
		builder.addCase(momoPay.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload?.data?.message || 'Unknown Error occurred!';
		});
	},
});

export const { resetMomo, changePaymentStatus } = momoSlice.actions;

export default momoSlice.reducer;
