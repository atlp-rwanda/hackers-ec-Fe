/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../../@types/DynamicData';
import { QueryState } from '../../../@types/query';
import API from '../../../utils/api';
import { queryTypes } from '../../../validations/Queries/queryValidations';

const initialState: QueryState = {
	isLoading: false,
	singleQuery: [],
	error: null,
	querries: [],
};

export const sendQuery = createAsyncThunk(
	'sendQuery',
	async (
		{ lastName, firstName, subject, email, message }: queryTypes,
		{ rejectWithValue },
	) => {
		try {
			const { data } = await API.post('/querries', {
				lastName: lastName,
				firstName: firstName,
				subject: subject,
				email: email,
				message: message,
			});

			return data;
		} catch (error: any) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const getQuerries = createAsyncThunk(
	'getQuerries',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/querries');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const getSingleQuery = createAsyncThunk(
	'getSingleQuery',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`/querries/${id}`);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const querieSlice = createSlice({
	name: 'queries',
	initialState,
	reducers: {
		clearQueries: (state) => {
			state.querries = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(sendQuery.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(sendQuery.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(sendQuery.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
		});

		// get queries
		builder.addCase(getQuerries.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getQuerries.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.querries = action.payload.data;
			},
		);
		builder.addCase(
			getQuerries.rejected,
			(state, action: PayloadAction<any>) => {
				state.error = action.payload;
			},
		);

		// ****** get single query ***********
		builder.addCase(getSingleQuery.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getSingleQuery.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.singleQuery = [action.payload.data];
			},
		);
		builder.addCase(
			getSingleQuery.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
	},
});

export default querieSlice.reducer;
