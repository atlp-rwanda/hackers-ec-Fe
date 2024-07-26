import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HandleGoogleLogin from '../components/HandleGoogleLogin';
import Layout from '../components/Layout';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import PreventSeller from '../components/Layouts/PreventSeller';
import ProtectedDashboard from '../components/Layouts/ProtectedDashboard';
import ProtectedRoutes from '../components/Layouts/ProtectedRoutes';
import UpdatePassword from '../components/Layouts/UpdatePassword';
import VerifyAccount from '../components/auth/VerifyAccount';
import About from '../pages/About';
import EditUser from '../pages/Admin/EditUserRoles';
import Contacts from '../pages/Contacts';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import PaymentSuccess from '../pages/PaymentSuccess';
import ProductsPage from '../pages/ProductsPage';
import UserRedirection from '../pages/SellerRedirection';
import SingleProduct from '../pages/SingleProduct';
import Wishlist from '../pages/Wishlist';
import Login from '../pages/auth/Login';
import UserProfile from '../pages/auth/Profile';
import Register from '../pages/auth/Register';
import TwoFactorAuth from '../pages/auth/TwoFactor';
import Cart from '../pages/carts/Carts';
import Orders from '../pages/dashboard/buyer/order/Orders';
import SingleOrders from '../pages/dashboard/buyer/order/SingleOrders';
import SalesPage from '../pages/dashboard/seller/Sales/SalesPage';
import SingleSale from '../pages/dashboard/seller/Sales/SingleSale';
import WishlistPage from '../pages/dashboard/seller/wishlist/wishlistPage';
import ForgotPassword from '../pages/forgottenPassword/ForgotPassword';
import ReviewsPage from '../pages/product/ReviewsPage';
import ResetPassword from '../pages/resetPassword/resetPassword';
import UserRedirectionPage from '../pages/userRedirection';
import { useAppSelector } from '../redux/hooks/hooks';
import {
	AddProducts,
	DashboardCategories,
	DashboardContent,
	DashboardProducts,
	DashboardSingleProducts,
	UserRoles,
	Users,
} from '../utils/DashboardUtils';
import Querries from '../pages/Admin/Querries';
import SingleQuerries from '../pages/Admin/SingleQuerries';

function Routers() {
	const { isLoggedOut } = useAppSelector((state) => state.logout);

	const navigate = useNavigate();
	const accessToken = localStorage.getItem('access_token') || '';
	useEffect(() => {
		if (isLoggedOut) navigate('/');
	});
	return (
		<>
			<Routes>
				<Route path="/users/forgot-password" element={<ForgotPassword />} />
				<Route path="/users/reset-password" element={<ResetPassword />} />
				<Route
					path="/forgot-password-success"
					element={<UserRedirectionPage />}
				/>
				<Route path="/payments/success" element={<PaymentSuccess />} />
				<Route
					path="/login"
					element={accessToken ? <Navigate to="/" /> : <Login />}
				/>

				<Route path="/google" element={<HandleGoogleLogin />} />
				<Route path="/register" element={<Register />} />
				<Route path="users/account/verify/:token" element={<VerifyAccount />} />
				<Route path="/users/2fa" element={<TwoFactorAuth />} />
				<Route path="/success" element={<UserRedirection />} />
				<Route
					element={<ProtectedRoutes roles={['ADMIN', 'SELLER', 'BUYER']} />}
				>
					<Route path="/profile" element={<UserProfile />} />{' '}
					<Route path="/password" element={<UpdatePassword />} />{' '}
				</Route>
				<Route path="/" element={<Layout />}>
					<Route element={<ProtectedRoutes roles={['BUYER']} />}>
						<Route path="/carts" element={<Cart />} />
					</Route>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="contacts" element={<Contacts />} />

					<Route element={<ProtectedRoutes roles={['BUYER']} />}>
						<Route path="/wishes" element={<Wishlist />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/orders/:id" element={<SingleOrders />} />
					</Route>

					<Route element={<ProtectedRoutes roles={['BUYER']} />}>
						<Route path="/orders/:id" element={<SingleOrders />} />
					</Route>
					<Route element={<PreventSeller roles={['']} />}>
						<Route
							element={<ProtectedRoutes roles={['ADMIN', 'SELLER', 'BUYER']} />}
						>
							<Route path="products">
								<Route index element={<ProductsPage />} />
								<Route path=":id" element={<SingleProduct />} />
							</Route>
							<Route path="reviews/:id" element={<ReviewsPage />} />
						</Route>
					</Route>
				</Route>
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<ProtectedDashboard />}>
						<Route index element={<DashboardContent />} />
						<Route path="products">
							<Route index element={<DashboardProducts />} />
							<Route path=":id" element={<DashboardSingleProducts />} />
							<Route path="new" element={<AddProducts />} />
							<Route path="edit/:id" element={<AddProducts />} />
						</Route>
						<Route path="wishlists">
							<Route index element={<WishlistPage />} />
						</Route>
						<Route path="querries">
							<Route index element={<Querries />} />
							<Route path=":id" element={<SingleQuerries />} />
						</Route>
						<Route path="sales">
							<Route index element={<SalesPage />} />
							<Route path=":id" element={<SingleSale />} />
						</Route>
						<Route path="users">
							<Route index element={<Users />} />
						</Route>
						<Route path="roles">
							<Route index element={<UserRoles />} />
							<Route path=":id" element={<EditUser />} />
						</Route>
						<Route path="categories">
							<Route index element={<DashboardCategories />} />
						</Route>
					</Route>
				</Route>
				<Route path="/error" element={<ErrorPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default Routers;
