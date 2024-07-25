/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface SellerWishlistState {
	isLoading: boolean;
	wishlist: DynamicData;
	error: string | null;
}

const initialState: SellerWishlistState = {
	isLoading: false,
	wishlist: [],
	error: null,
};

export const getSellerWishlist = createAsyncThunk(
	'getSellerWishlist',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/wishes');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const sellerWishlistSlice = createSlice({
	name: 'wishes',
	initialState,

	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSellerWishlist.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getSellerWishlist.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.wishlist = action.payload.data;
			},
		);
		builder.addCase(
			getSellerWishlist.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
	},
});

export default sellerWishlistSlice.reducer;
