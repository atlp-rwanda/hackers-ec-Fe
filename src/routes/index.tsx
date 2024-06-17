import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import About from '../pages/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import UserProfile from '../pages/auth/Profile';
import Product from '../pages/Product';
import Contacts from '../pages/Contacts';
import VerifyAccount from '../components/auth/VerifyAccount';
import ProtectedRoutes from '../components/Layouts/ProtectedRoutes';

function Routers() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="users/account/verify/:token" element={<VerifyAccount />} />
				<Route
					element={<ProtectedRoutes roles={['ADMIN', 'SELLER', 'BUYER']} />}
				>
					<Route path="/profile" element={<UserProfile />} />{' '}
				</Route>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="products" element={<Product />} />
					<Route path="contacts" element={<Contacts />} />
				</Route>
			</Routes>
		</>
	);
}

export default Routers;
