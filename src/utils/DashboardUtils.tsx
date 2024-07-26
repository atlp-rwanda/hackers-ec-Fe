import { UserInfoTypes } from '../@types/userType';
import AdminStat from '../components/adminDashboard/AdminStat';
import AdminDashboardAllUser from '../pages/Admin/DashboardGetUser';
import EditUser from '../pages/Admin/EditUserRoles';
import NotFound from '../pages/NotFound';
import AddProduct from '../pages/dashboard/seller/AddProduct';
import SellerDashboard from '../pages/dashboard/seller/SellerDashboard';
import SellerProductsPage from '../pages/dashboard/seller/SellerProductsPage';
import SellerSingleProduct from '../pages/dashboard/seller/SellerSingleProduct';
import CategoriesPage from '../pages/dashboard/seller/categories/CategoriesPage';
import fetchInfo from './userDetails';

export const DashboardProducts = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded?.role === 'ADMIN' ? (
		<NotFound />
	) : decoded?.role === 'SELLER' ? (
		<SellerProductsPage />
	) : (
		<div>Unauthorized access</div>
	);
};
export const DashboardSingleProducts = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded?.role === 'ADMIN' ? (
		<NotFound />
	) : decoded?.role === 'SELLER' ? (
		<SellerSingleProduct />
	) : (
		<div>Unauthorized access</div>
	);
};

export const DashboardContent = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded?.role === 'ADMIN' ? (
		<div className="w-full">
			<AdminStat />
		</div>
	) : decoded?.role === 'SELLER' ? (
		<SellerDashboard />
	) : (
		<div>Unauthorized access</div>
	);
};

export const AddProducts = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded?.role === 'ADMIN' ? (
		<NotFound />
	) : decoded?.role === 'SELLER' ? (
		<AddProduct />
	) : (
		<div>Unauthorized access</div>
	);
};

export const Users = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded?.role === 'ADMIN' ? (
		<AdminDashboardAllUser />
	) : decoded?.role === 'SELLER' ? (
		<NotFound />
	) : (
		<div>Unauthorized access</div>
	);
};

export const UserRoles = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded?.role === 'ADMIN' ? (
		<div>role</div>
	) : decoded?.role === 'SELLER' ? (
		<NotFound />
	) : (
		<div>Unauthorized access</div>
	);
};

export const EditRole = () => {
	const decoded = fetchInfo() as UserInfoTypes;

	return decoded?.role === 'ADMIN' ? (
		<EditUser />
	) : decoded?.role === 'SELLER' ? (
		<NotFound />
	) : (
		<div>Unauthorized access</div>
	);
};

export const DashboardCategories = () => {
	const decoded = fetchInfo() as UserInfoTypes;
	return decoded?.role === 'SELLER' ? (
		<CategoriesPage />
	) : decoded?.role === 'ADMIN' ? (
		<NotFound />
	) : (
		<div>Unauthorized access</div>
	);
};
