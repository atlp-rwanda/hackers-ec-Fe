import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../../@types/DynamicData';
import API from '../../../utils/api';
import { SalesResponse } from '../../../@types/SalesTypes';

export interface saleState {
	allSalesData: DynamicData[];
	singleSaleData: DynamicData | null;
	isLoading: boolean;
	error: string | null;
	isModalOpen: boolean;
	selectedSaleId: string | null;
	deliveryDate: string;
	status: string;
	productName: string;
	productImage: string;
}

const initialState: saleState = {
	allSalesData: [],
	singleSaleData: null,
	isLoading: false,
	error: null,
	isModalOpen: false,
	selectedSaleId: null,
	deliveryDate: '',
	status: '',
	productName: '',
	productImage: '',
};

const sortSales = (sales: DynamicData) => {
	if (!Array.isArray(sales)) return [];
	return sales.sort((a, b) => a.id.localeCompare(b.id));
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

export const getSingleSale = createAsyncThunk(
	'fetchSingleSale',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`/sales/${id}`);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const sales = createSlice({
	name: 'sales',
	initialState,
	reducers: {
		openModal: (
			state,
			action: PayloadAction<{
				id: string;
				status: string;
				productImage: string;
				productName: string;
				deliveryDate: string;
			}>,
		) => {
			state.isModalOpen = true;
			state.selectedSaleId = action.payload.id;
			state.status = action.payload.status;
			state.productImage = action.payload.productImage;
			state.productName = action.payload.productName;
			state.deliveryDate = action.payload.deliveryDate;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
			state.selectedSaleId = null;
			state.deliveryDate = '';
			state.status = '';
		},
		setDeliveryDate: (state, action: PayloadAction<string>) => {
			state.deliveryDate = action.payload;
		},
		setStatus: (state, action: PayloadAction<string>) => {
			state.status = action.payload;
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
				state.allSalesData = sortSales(action.payload.data);
				state.error = null;
			},
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		builder.addCase(getSales.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload.message || 'An error occurred';
		});
		builder.addCase(getSingleSale.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getSingleSale.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.singleSaleData = action.payload;
				state.error = null;
			},
		);
		builder.addCase(
			getSingleSale.rejected,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.message || 'An error occurred';
			},
		);
	},
});

export const { openModal, closeModal, setDeliveryDate, setStatus } =
	sales.actions;
export default sales.reducer;
