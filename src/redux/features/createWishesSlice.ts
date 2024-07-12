/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface wishType {
	productId: string;
}

const initialState: DynamicData = {
	isLoading: false,
	data: [],
	error: null,
};

export const createWish = createAsyncThunk(
	'createWish',
	async ({ productId }: wishType, { rejectWithValue }) => {
		try {
			const { data } = await API.post('/wishes', {
				productId,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const creatWishSlice = createSlice({
	name: 'createWish',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createWish.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			createWish.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.data = [...state.data, action.payload];
				state.error = null;
			},
		);
		builder.addCase(
			createWish.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default creatWishSlice.reducer;
