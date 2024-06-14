import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './features/loginSlice';
import { otpReducer } from './features/OTPSlice';
import RegisterSlice from './features/RegisterSlice';
import navReducer from './features/navSlice';
import VerifyAccountSlice from './features/VerifyAccountSlice';
export const store = configureStore({
	reducer: {
		login: loginReducer,
		register: RegisterSlice,
		nav: navReducer,
		verifyAccount: VerifyAccountSlice,
		otp: otpReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
