/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForgotPasswordType } from '../../validations/forgottenPassword/forgotten.password.validation';
import API from '../../utils/api';
import { DynamicData } from '../../@types/DynamicData';
import { ForgotPasswordState } from '../../@types/forgotPassword/forgotPassword';

export const forgotPassword = createAsyncThunk(
	'forgotPassword',
	async (forgotPasswordData: ForgotPasswordType, { rejectWithValue }) => {
		try {
			const { data } = await API.post(
				'/users/forgot-password',
				forgotPasswordData,
			);
			console.log('form redux forgot password data :', data);
			return data;
		} catch (error) {
			console.log('form redux forgot password error:', error);
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: ForgotPasswordState = {
	error: null,
};

const forgotPasswordSlice = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(forgotPassword.pending, (state) => {
			state.error = null;
		});

		builder.addCase(forgotPassword.fulfilled, (state) => {
			state.error = null;
		});

		builder.addCase(
			forgotPassword.rejected,
			(state, action: PayloadAction<any>) => {
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default forgotPasswordSlice.reducer;
