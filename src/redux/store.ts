import { configureStore } from '@reduxjs/toolkit';
import AssignrolesSlice from './features/AssignrolesSlice';
import { otpReducer } from './features/OTPSlice';
import RegisterSlice from './features/RegisterSlice';
import categorySlice from './features/categorySlice';
import forgottonSlice from './features/forgottonSlice';
import getRolesSlice from './features/getRolesSlice';
import getUserSlice from './features/getUserSlice';
import { loginReducer } from './features/loginSlice';
import navReducer from './features/navSlice';
import productSlice from './features/productSlice';
import resetPasswordSlice from './features/resetSlice';
import profileSlice from './features/userUpdateSlice';
import googleSlice from './features/googleSlice';
import VerifyAccountSlice from './features/VerifyAccountSlice';
import notificationSlice from './features/notificationSlice';
import EnableAccountSlice from './features/EnableAccountSlice';
import SearchSlice from './features/SearchSlice';
import deleteProductSlice from './features/deleteProductSlice';
import CreateReviewSlice from './features/CreateReviewSlice';
import fetchReviewSlice from './features/getReviewSice';
import editReviewSlice from './features/editReviewSlice';

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
		notifications: notificationSlice,
		enableAccount: EnableAccountSlice,
		search: SearchSlice,
		deleteProduct: deleteProductSlice,
		createReview: CreateReviewSlice,
		fetchReview: fetchReviewSlice,
		editReview: editReviewSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
