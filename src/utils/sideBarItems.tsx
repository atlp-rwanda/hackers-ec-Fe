import { FaUsers } from 'react-icons/fa';
import {
	BadgeDollarSign,
	GanttChart,
	Kanban,
	LayoutDashboard,
	ShoppingBasket,
} from 'lucide-react';
import { MdDashboard } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaNetworkWired } from 'react-icons/fa';

export const sideBarItems = [
	{
		path: '/dashboard/admin',
		name: 'Dashboard',
		icon: <MdDashboard />,
		scope: ['ADMIN'],
	},
	{
		path: '/dashboard/admin/users',
		name: 'Users',
		icon: <FaUsers />,
		scope: ['ADMIN'],
	},

	{
		path: '/dashboard/seller',
		name: 'Dashboard',
		icon: <LayoutDashboard />,
		scope: ['SELLER'],
	},
	{
		path: '/dashboard/seller/products',
		name: 'Products',
		icon: <ShoppingBasket />,
		scope: ['SELLER'],
	},
	{
		path: '/dashboard/seller/categories',
		name: 'Categories',
		icon: <Kanban />,
		scope: ['SELLER'],
	},
	{
		path: '/dashboard/seller/sales',
		name: 'Sales',
		icon: <BadgeDollarSign />,
		scope: ['SELLER'],
	},
	{
		path: '/dashboard/seller/wishlists',
		name: 'Wishlists',
		icon: <GanttChart />,
		scope: ['SELLER'],
	},

	{
		path: '/dashboard/admin/roles',
		name: 'Roles',
		icon: <FaNetworkWired />,
		scope: ['ADMIN'],
	},

	{
		path: '/dashboard/admin/settings',
		name: 'Setting',
		icon: <IoSettingsSharp />,
		scope: ['BUYER', 'SELLER', 'ADMIN'],
	},
];
