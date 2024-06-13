import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';
import RegisterSlice from './features/RegisterSlice';
export const store = configureStore({
	reducer: {
		login: loginSlice,
		register: RegisterSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
