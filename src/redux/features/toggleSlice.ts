import { createSlice } from '@reduxjs/toolkit';

interface ToggleState {
	openTaggle: boolean;
}

const initialState: ToggleState = {
	openTaggle: false,
};

const toggleSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		payModel(state) {
			state.openTaggle = !state.openTaggle;
		},
	},
});

export const { payModel } = toggleSlice.actions;
export default toggleSlice.reducer;
