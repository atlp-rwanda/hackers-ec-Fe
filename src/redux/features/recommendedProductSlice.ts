/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface RecommendedProductsState {
	isLoading: boolean;
	error: string | null;
	products: DynamicData;
}

const initialState: RecommendedProductsState = {
	isLoading: false,
	products: [],
	error: null,
};

export const getRecommendedProducts = createAsyncThunk(
	'recommendedProducts',
	async (productId: string, { rejectWithValue }) => {
		try {
			const { data } = await API.post(`/products/recommended`, {
				id: productId,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const recommendedProductsSlice = createSlice({
	name: 'recommendedProducts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getRecommendedProducts.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(
			getRecommendedProducts.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.products = action.payload.data;
			},
		);

		builder.addCase(
			getRecommendedProducts.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
	},
});

export default recommendedProductsSlice.reducer;
