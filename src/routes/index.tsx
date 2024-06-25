import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AddProduct from '../pages/dashboard/seller/AddProduct';
import Products from '../pages/dashboard/seller/Products';
import Product from '../pages/Product';
import Contacts from '../pages/Contacts';
import VerifyAccount from '../components/auth/VerifyAccount';
import TwoFactorAuth from '../pages/auth/TwoFactor';
import UserRedirection from '../pages/SellerRedirection';
import NotFound from '../pages/NotFound';
import ProtectedRoutes from '../components/Layouts/ProtectedRoutes';
import ForgotPassword from '../pages/forgottenPassword/ForgotPassword';
import ResetPassword from '../pages/resetPassword/resetPassword';
import UserRedirectionPage from '../pages/userRedirection';

function Routers() {
	return (
		<>
			<Routes>
				<Route path="/users/forgot-password" element={<ForgotPassword />} />
				<Route path="/users/reset-password" element={<ResetPassword />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="users/account/verify/:token" element={<VerifyAccount />} />
				<Route path="/users/2fa" element={<TwoFactorAuth />} />
				<Route path="/success" element={<UserRedirection />} />
				<Route
					path="/forgot-password-success"
					element={<UserRedirectionPage />}
				/>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="products" element={<Product />} />
					<Route path="contacts" element={<Contacts />} />
				</Route>
				<Route element={<ProtectedRoutes roles={['ADMIN', 'SELLER']} />}>
					<Route element={<DashboardLayout />}>
						<Route element={<ProtectedRoutes roles={['SELLER']} />}>
							<Route path="/dashboard/seller">
								<Route path="products">
									<Route index element={<Products />} />
									<Route path="new" element={<AddProduct />} />
								</Route>
							</Route>
						</Route>
						<Route element={<ProtectedRoutes roles={['ADMIN']} />}>
							<Route path="/dashboard/admin" />
						</Route>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default Routers;
