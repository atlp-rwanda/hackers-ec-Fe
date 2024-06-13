/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import { ResetPasswordState } from '../../@types/resetPassword/resetPasswordTypes';
import API from '../../utils/api';
import { ResetPasswordPayload } from '../../validations/resetPassword/reset.password.validation';

export const resetPassword = createAsyncThunk(
	'resetPassword',
	async (resetPasswordData: ResetPasswordPayload, { rejectWithValue }) => {
		try {
			const { data } = await API.post(
				'/users/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwYWI2OWZiLTdmNTgtNGM5OS04MWMzLTA1YjY2ODJkZGE0MiIsInJvbGUiOiIxMWFmZDRmMS0wYmVkLTRhM2ItOGFkNS0wOTc4ZGFiZjhmY2QiLCJlbWFpbCI6ImguY2xlbWVudG9lcnRAZ21haWwuY29tIiwiaWF0IjoxNzE4NTgxOTcwLCJleHAiOjE3NTAxMzk1NzB9.AsHhIhTpa_nxjQjsSUSKda_g4In27HJk3LGiLufgyz8',
				resetPasswordData,
			);

			console.log('reset password redux ', data);
			return data;
		} catch (error) {
			console.log('reset password redux ERROR', error);
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: ResetPasswordState = {
	token: null,
	error: null,
};

const resetPasswordSlice = createSlice({
	name: 'resetPassword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(resetPassword.pending, (state) => {
			console.log('tooooken pending', state.token);
			state.token = null;
			state.error = null;
		});

		builder.addCase(resetPassword.fulfilled, (state) => {
			console.log('tooooken full', state.token);
			state.token = null;
			state.error = null;
		});

		builder.addCase(
			resetPassword.rejected,
			(state, action: PayloadAction<any>) => {
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default resetPasswordSlice.reducer;

// export const resetPassword = createAsyncThunk(
// 	'resetPassword',
// 	async (resetPasswordData: ResetPasswordSchemaType, { rejectWithValue }) => {
// 		try {

//       const { data } = await API.post(
// 				`/users/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwYWI2OWZiLTdmNTgtNGM5OS04MWMzLTA1YjY2ODJkZGE0MiIsInJvbGUiOiIxMWFmZDRmMS0wYmVkLTRhM2ItOGFkNS0wOTc4ZGFiZjhmY2QiLCJlbWFpbCI6ImguY2xlbWVudG9lcnRAZ21haWwuY29tIiwiaWF0IjoxNzE4NTgwOTQzLCJleHAiOjE3NTAxMzg1NDN9.yb5U8JsBkfmkPfSSQymF3_0Nv56ug5BZxmij-uu13bM`,
// 				resetPasswordData,
// 			);

// 			console.log('reset password redux ', data);
// 			return data;
// 		} catch (error) {
// 			console.log('reset password redux ERROR', error);
// 			return rejectWithValue((error as DynamicData).response);
// 		}
// 	},
// );
