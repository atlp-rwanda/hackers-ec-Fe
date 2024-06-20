import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';
import RegisterSlice from './features/RegisterSlice';
import navReducer from './features/navSlice';
export const store = configureStore({
	reducer: {
		login: loginSlice,
		register: RegisterSlice,
		nav: navReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
