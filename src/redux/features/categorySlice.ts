/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { DynamicData } from '../../@types/DynamicData';
import { CategoryState } from '../../@types/Category';
import { categorySchemaType } from '../../validations/categories/category.validation';

// Thunk to get all products

export const fetchCategories = createAsyncThunk(
	'fetch/allCategories',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/categories');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

// Thunk to add new product

export const addCategory = createAsyncThunk(
	'addCategory',
	async (categoryData: categorySchemaType, { rejectWithValue }) => {
		try {
			const { data } = await API.post('/categories', categoryData);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

// Thunk to update product

export const updateCategory = createAsyncThunk(
	'updateCategory',
	async (categoryData: categorySchemaType, { rejectWithValue }) => {
		try {
			const { data } = await API.patch(
				`/categories/${categoryData.id}`,
				categoryData,
			);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: CategoryState = {
	isLoading: false,
	categories: [],
	error: null,
	isCategoryModelOpen: false,
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		manipulateModelVisiblity: (state) => {
			state.isCategoryModelOpen = !state.isCategoryModelOpen;
		},
		manipulateUpdatedCategory: (state, action: PayloadAction<DynamicData>) => {
			const categoryIndex = state.categories.findIndex(
				(category) => category.id == action.payload.id,
			);
			if (categoryIndex !== -1) {
				state.categories[categoryIndex] = action.payload;
			}
		},
		manipulateAddedCategory: (state, action: PayloadAction<DynamicData>) => {
			state.categories.unshift(action.payload);
		},
	},
	extraReducers: (builder) => {
		// Get all categories

		builder.addCase(fetchCategories.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			fetchCategories.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.categories = action.payload.data;
				state.isLoading = false;
			},
		);
		builder.addCase(
			fetchCategories.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);

		// Add new category

		builder.addCase(addCategory.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(addCategory.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
		});

		builder.addCase(
			addCategory.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);

		// Update category

		builder.addCase(updateCategory.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(updateCategory.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
		});

		builder.addCase(
			updateCategory.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export const {
	manipulateModelVisiblity,
	manipulateUpdatedCategory,
	manipulateAddedCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
