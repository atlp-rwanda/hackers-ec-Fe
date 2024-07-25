/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';
import {
	availabilityProps,
	productAvailabilityStates,
} from '../../@types/productAvailability';

const initialState: productAvailabilityStates = {
	isLoading: false,
	error: null,
	message: '',
	availability: '',
};

export const productAvailability = createAsyncThunk(
	'productAvalability',
	async ({ id, isAvailable }: availabilityProps, { rejectWithValue }) => {
		try {
			const { data } = await API.patch(`/products/${id}/availability-status`, {
				isAvailable,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const productAvailabilitySlice = createSlice({
	name: 'productAvalability',
	initialState,
	reducers: {
		setAvailability(state, action: PayloadAction<string>) {
			state.availability = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(productAvailability.pending, (state) => {
			(state.isLoading = true), (state.error = null);
		});

		builder.addCase(
			productAvailability.fulfilled,
			(state, action: PayloadAction<productAvailabilityStates>) => {
				(state.isLoading = false),
					(state.error = null),
					(state.message = action.payload.message);
			},
		);

		builder.addCase(
			productAvailability.rejected,
			(state, action: PayloadAction<any>) => {
				(state.isLoading = false),
					(state.message = action.payload.message),
					(state.error = action.payload.dat.message);
			},
		);
	},
});

export const { setAvailability } = productAvailabilitySlice.actions;
export default productAvailabilitySlice.reducer;
