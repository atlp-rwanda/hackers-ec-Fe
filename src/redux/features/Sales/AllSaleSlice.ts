import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../../@types/DynamicData';
import API from '../../../utils/api';

interface SalesState {
	data: DynamicData[];
	isLoading: boolean;
	error: string | null;
	isModalOpen: boolean;
	selectedSaleId: string | null;
	deliveryDate: string;
	action: string;
}

const initialState: SalesState = {
	data: [],
	isLoading: false,
	error: null,
	isModalOpen: false,
	selectedSaleId: null,
	deliveryDate: '',
	action: 'deliver',
};

export const getSales = createAsyncThunk(
	'fetchSales',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/sales');
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

type SalesResponse = {
	message: string;
	data: DynamicData[];
};

const salesSlice = createSlice({
	name: 'sales',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<string>) => {
			state.isModalOpen = true;
			state.selectedSaleId = action.payload;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
			state.selectedSaleId = null;
			state.deliveryDate = '';
			state.action = 'deliver';
		},
		setDeliveryDate: (state, action: PayloadAction<string>) => {
			state.deliveryDate = action.payload;
		},
		setAction: (state, action: PayloadAction<string>) => {
			state.action = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getSales.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getSales.fulfilled,
			(state, action: PayloadAction<SalesResponse>) => {
				state.isLoading = false;
				state.data = action.payload.data;
				state.error = null;
			},
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		builder.addCase(getSales.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	},
});

export const { openModal, closeModal, setDeliveryDate, setAction } =
	salesSlice.actions;
export default salesSlice.reducer;
