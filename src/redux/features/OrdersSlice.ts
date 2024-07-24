/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface OrderState {
	isLoading: boolean;
	orders: DynamicData;
	numberOfOrder: number;
	singleOrder: DynamicData;
	error: string | null;
}

const initialState: OrderState = {
	isLoading: false,
	orders: [],
	numberOfOrder: 0,
	singleOrder: [],
	error: null,
};

export const getOrders = createAsyncThunk(
	'getOrders',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/orders');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const getSingleOrder = createAsyncThunk(
	'getSingleOrder',
	async (orderId: string, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`/orders/${orderId}`);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// ****** get orders ***********
		builder.addCase(getOrders.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getOrders.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.orders = action.payload.data;
				state.numberOfOrder = action.payload?.data?.length;
			},
		);
		builder.addCase(getOrders.rejected, (state, action: PayloadAction<any>) => {
			state.error = action.payload;
		});

		// ****** get single orders ***********
		builder.addCase(getSingleOrder.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getSingleOrder.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.singleOrder = [action.payload.data];
				state.numberOfOrder = action.payload.data.length;
			},
		);
		builder.addCase(
			getSingleOrder.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
	},
});

export default ordersSlice.reducer;
