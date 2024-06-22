import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import VerifyAccount from '../components/auth/VerifyAccount';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import UserRedirection from '../pages/SellerRedirection';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import TwoFactorAuth from '../pages/auth/TwoFactor';
import ForgotPassword from '../pages/forgottenPassword/ForgotPassword';
import ResetPassword from '../pages/resetPassword/resetPassword';
import UserRedirectionPage from '../pages/userRedirection';
import SingleProduct from '../pages/SingleProduct';
import PreventSeller from '../components/Layouts/PreventSeller';
import ProtectedDashboard from '../components/Layouts/ProtectedDashboard';
import {
	AddProduct,
	DashboardContent,
	DashboardProducts,
	DashboardSingleProducts,
} from '../utils/DashboardUtils';
import ProductsPage from '../pages/ProductsPage';

function Routers() {
	return (
		<>
			<Routes>
				<Route path="/users/forgot-password" element={<ForgotPassword />} />
				<Route path="/users/reset-password" element={<ResetPassword />} />
				<Route
					path="/forgot-password-success"
					element={<UserRedirectionPage />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="users/account/verify/:token" element={<VerifyAccount />} />
				<Route path="/users/2fa" element={<TwoFactorAuth />} />
				<Route path="/success" element={<UserRedirection />} />
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="contacts" element={<Contacts />} />
					<Route element={<PreventSeller roles={['']} />}>
						<Route path="products">
							<Route index element={<ProductsPage />} />
							<Route path=":id" element={<SingleProduct />} />
						</Route>
					</Route>
				</Route>
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<ProtectedDashboard />}>
						<Route index element={<DashboardContent />} />
						<Route path="products">
							<Route index element={<DashboardProducts />} />
							<Route path=":id" element={<DashboardSingleProducts />} />
							<Route path="new" element={<AddProduct />} />
						</Route>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default Routers;
