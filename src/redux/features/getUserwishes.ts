/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

const initialState: DynamicData = {
	isLoading: false,
	data: [],
	error: null,
};

export const fetchWishes = createAsyncThunk(
	'fetchWishes',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`/wishes`);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const fetchWishesSlice = createSlice({
	name: 'fetchWishes',
	initialState,
	reducers: {
		clearWishlist: (state) => {
			state.data = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWishes.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			fetchWishes.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.data = [...state.data, action.payload];
				state.error = null;
			},
		);
		builder.addCase(
			fetchWishes.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});
export const { clearWishlist } = fetchWishesSlice.actions;

export default fetchWishesSlice.reducer;
