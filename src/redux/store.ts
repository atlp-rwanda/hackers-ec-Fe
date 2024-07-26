import { configureStore } from '@reduxjs/toolkit';
import AssignrolesSlice from './features/AssignrolesSlice';
import cartSlice from './features/cartSlice';
import categorySlice from './features/categorySlice';
import chatSlice from './features/chatSlice';
import CreateReviewSlice from './features/CreateReviewSlice';
import createWishesSlice from './features/createWishesSlice';
import deleteProductSlice from './features/deleteProductSlice';
import editReviewSlice from './features/editReviewSlice';
import EnableAccountSlice from './features/EnableAccountSlice';
import forgottonSlice from './features/forgottonSlice';
import fetchReviewSlice from './features/getReviewSice';
import getRolesSlice from './features/getRolesSlice';
import getUserSlice from './features/getUserSlice';
import fetchWishesSlice from './features/getUserwishes';
import googleSlice from './features/googleSlice';
import { loginReducer } from './features/loginSlice';
import logoutSlice from './features/logoutSlice';
import navReducer from './features/navSlice';
import notificationSlice from './features/notificationSlice';
import OrdersSlice from './features/OrdersSlice';
import { otpReducer } from './features/OTPSlice';
import OrderDetailSlice from './features/PaidOrderSlice';
import passwordSlice from './features/passwordUpdateSlice';
import productSlice from './features/productSlice';
import recommendedProductsSlice from './features/recommendedProductSlice';
import RegisterSlice from './features/RegisterSlice';
import resetPasswordSlice from './features/resetSlice';
import AllSaleSlice from './features/Sales/AllSaleSlice';
import UpdateorderSlice from './features/Sales/UpdateorderSlice';
import SearchSlice from './features/SearchSlice';
import sellerWishlistSlice from './features/sellerWishlistSlice';
import statisticsSlice from './features/statisticsSlice';
import StripePaymentSlice from './features/StripePaymentSlice';
import toggleSlice from './features/toggleSlice';
import profileSlice from './features/userUpdateSlice';
import VerifyAccountSlice from './features/VerifyAccountSlice';
import productAvailabilitySlice from './features/productAvailabilitySlice';
import momoSlice from './features/momoPaymentSlice';

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
		updatePassword: passwordSlice,
		cart: cartSlice,
		chat: chatSlice,
		sales: AllSaleSlice,
		statistics: statisticsSlice,
		recommendedProducts: recommendedProductsSlice,
		fetchWishes: fetchWishesSlice,
		createWishes: createWishesSlice,
		updateOrder: UpdateorderSlice,
		logout: logoutSlice,
		stripe: StripePaymentSlice,
		userOrder: OrderDetailSlice,
		toggle: toggleSlice,
		order: OrdersSlice,
		sellerWishes: sellerWishlistSlice,
		productAvailability: productAvailabilitySlice,
		momo: momoSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
