import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';

import profileSlice from './features/userUpdateSlice';
import RegisterSlice from './features/RegisterSlice';
import navReducer from './features/navSlice';
import VerifyAccountSlice from './features/VerifyAccountSlice';

export const store = configureStore({
	reducer: {
		login: loginSlice,
		profile: profileSlice,
		register: RegisterSlice,
		nav: navReducer,
		verifyAccount: VerifyAccountSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
