/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productTypes } from '../../validations/products/addProductValidation';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';
import { ProductState } from '../../@types/product';

export const addProduct = createAsyncThunk(
	'addProduct',
	async (productData: productTypes, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			Object.keys(productData).forEach((key) => {
				if (key === 'images' && productData.images) {
					productData.images.forEach((image) =>
						formData.append('images', image),
					);
				} else {
					formData.append(
						key,
						productData[key as keyof productTypes] as string,
					);
				}
			});
			const { data } = await API.post('/products', formData);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: ProductState = {
	isLoading: false,
	products: [],
	error: null,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addProduct.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			addProduct.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.products = [...state.products, action.payload.data];
				state.error = null;
			},
		);
		builder.addCase(
			addProduct.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default productSlice.reducer;
