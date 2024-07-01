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
import getUserSlice from './features/getUserSlice';
import AssignrolesSlice from './features/AssignrolesSlice';
import getRolesSlice from './features/getRolesSlice';
import profileSlice from './features/userUpdateSlice';
import googleSlice from './features/googleSlice';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		register: RegisterSlice,
		nav: navReducer,
		profile: profileSlice,
		verifyAccount: VerifyAccountSlice,
		otp: otpReducer,
		categories: categorySlice,
		product: productSlice,
		forgotPassword: forgottonSlice,
		resetPassword: resetPasswordSlice,
		allUsers: getUserSlice,
		updateRoles: AssignrolesSlice,
		allRoles: getRolesSlice,
		google: googleSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
