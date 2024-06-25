import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './features/loginSlice';
import { otpReducer } from './features/OTPSlice';
import RegisterSlice from './features/RegisterSlice';
import navReducer from './features/navSlice';
import VerifyAccountSlice from './features/VerifyAccountSlice';
import categorySlice from './features/categorySlice';
import productSlice from './features/productSlice';
import forgottonSlice from './features/forgottonSlice';
import resetPasswordSlice from './features/resetSlice';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		register: RegisterSlice,
		nav: navReducer,
		verifyAccount: VerifyAccountSlice,
		otp: otpReducer,
		categories: categorySlice,
		product: productSlice,
		forgotPassword: forgottonSlice,
		resetPassword: resetPasswordSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
