import { UserInfoTypes } from '../@types/userType';
import NotFound from '../pages/NotFound';
import AddProduct from '../pages/dashboard/seller/AddProduct';
import SellerProductsPage from '../pages/dashboard/seller/SellerProductsPage';
import SellerSingleProduct from '../pages/dashboard/seller/SellerSingleProduct';
import fetchInfo from './userDetails';

export const DashboardProducts = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded.role === 'ADMIN' ? (
		<NotFound />
	) : decoded.role === 'SELLER' ? (
		<SellerProductsPage />
	) : (
		<div>Unauthorized access</div>
	);
};
export const DashboardSingleProducts = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded.role === 'ADMIN' ? (
		<NotFound />
	) : decoded.role === 'SELLER' ? (
		<SellerSingleProduct />
	) : (
		<div>Unauthorized access</div>
	);
};

export const DashboardContent = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded.role === 'ADMIN' ? (
		<div>Hello Admin</div>
	) : decoded.role === 'SELLER' ? (
		<div>Hello Seller</div>
	) : (
		<div>Unauthorized access</div>
	);
};
export const AddProducts = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded.role === 'ADMIN' ? (
		<NotFound />
	) : decoded.role === 'SELLER' ? (
		<AddProduct />
	) : (
		<div>Unauthorized access</div>
	);
};
