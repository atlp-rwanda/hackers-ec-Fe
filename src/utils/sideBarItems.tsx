import roleIcon from '../assets/roles.svg';
import { FaUsers } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import {
	BadgeDollarSign,
	GanttChart,
	Kanban,
	LayoutDashboard,
	ShoppingBasket,
} from 'lucide-react';

export const sideBarItems = [
	{
		path: '/dashboard/users',
		name: 'Users',
		icon: <FaUsers />,
		scope: ['ADMIN'],
	},
	{
		path: '/dashboard/roles',
		name: 'Roles',
		icon: roleIcon,
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
		path: '/dashboard/settings',
		name: 'Setting',
		icon: <IoSettingsSharp />,
		scope: ['BUYER', 'SELLER', 'ADMIN'],
	},
];
