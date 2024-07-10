import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../../@types/DynamicData';
import API from '../../../utils/api';

interface UpdateSalesState {
	data: DynamicData[];
	isLoading: boolean;
	error: string | null;
	status: string;
	deliveryDate: string;
}

const initialState: UpdateSalesState = {
	data: [],
	isLoading: false,
	error: null,
	status: 'Pending',
	deliveryDate: '',
};

export const updateOrder = createAsyncThunk(
	'updateOrder',
	async (
		data: { id: string; status: string; deliveryDate: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await API.patch(`sales/${data.id}/status`, {
				status: data.status,
				deliveryDate: data.deliveryDate,
			});
			return response.data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

const updateOrderSlice = createSlice({
	name: 'updateOrder',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<string>) => {
			state.status = action.payload;
		},
		setDeliveryDate: (state, action: PayloadAction<string>) => {
			state.deliveryDate = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				updateOrder.fulfilled,
				(state, action: PayloadAction<DynamicData>) => {
					state.isLoading = false;
					const index = state.data.findIndex(
						(sale) => sale.id === action.payload.id,
					);
					if (index !== -1) {
						state.data[index] = action.payload;
					} else {
						state.data.push(action.payload);
					}
					state.status = action.payload.status;
					state.deliveryDate = action.payload.deliveryDate;
				},
			)
			.addCase(updateOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setStatus, setDeliveryDate } = updateOrderSlice.actions;
export default updateOrderSlice.reducer;
