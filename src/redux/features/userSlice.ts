import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicData } from "../../@types/DynamicData";

interface UsersState {
	data: DynamicData[];
	loading: boolean;
	error: string | null;
}

const initialState: UsersState = {
	data: [],
	loading: false,
	error: null,
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		fetchUsersStart(state) {
			state.loading = true;
			state.error = null;
		},
		fetchUsersSuccess(state, action: PayloadAction<DynamicData[]>) {
			state.data = action.payload;
			state.loading = false;
		},
		fetchUsersFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		initialUsers(state, action: PayloadAction<DynamicData>) {
			state.data = [action.payload, ...state.data];
		},
	},
});

export const {
	fetchUsersStart,
	fetchUsersSuccess,
	fetchUsersFailure,
	initialUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
