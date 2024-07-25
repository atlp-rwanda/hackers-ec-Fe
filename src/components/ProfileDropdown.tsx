import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DynamicData } from '../@types/DynamicData';
import useToast from '../hooks/useToast';
import { Logout, resetLogoutState } from '../redux/features/logoutSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import fetchInfo from '../utils/userDetails';
import { ButtonIcon } from './buttons/ButtonIcon';
import IconLoader from './Loaders/IconLoader';

interface ProfileDropdownProps {
	image: string | undefined;
}

const ProfileDropdown = ({ image }: ProfileDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const userData = fetchInfo();

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.logout);
	const { showErrorMessage, showWorningMessage } = useToast();

	const handleLogout = async () => {
		try {
			const res = await dispatch(Logout()).unwrap();
			showWorningMessage(res.message);
		} catch (error) {
			const err = error as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	useEffect(() => {
		return () => {
			dispatch(resetLogoutState());
		};
	}, [dispatch]);

	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					type="button"
					className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					id="options-menu"
					aria-expanded="true"
					aria-haspopup="true"
					onClick={toggleDropdown}
				>
					<img
						src={image}
						alt="User Profile"
						className="h-10 w-10 rounded-full object-cover"
					/>
				</button>
			</div>

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4 }}
					className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-neutral-white ring-1 ring-black ring-opacity-5"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					<div className="py-1" role="none">
						<Link
							to="/profile"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-lightblue hover:text-neutral-white"
							role="menuitem"
							onClick={toggleDropdown}
						>
							My profile
						</Link>
						{userData?.role === 'BUYER' && (
							<Link
								to="/orders"
								className="block px-4 py-2 text-sm text-gray-700 hover:text-[1rem] hover:text-neutral-white hover:bg-primary-lightblue"
								role="menuitem"
								onClick={toggleDropdown}
							>
								My orders
							</Link>
						)}
						{(userData?.role === 'ADMIN' || userData?.role === 'SELLER') && (
							<Link
								to="/dashboard"
								className="block px-4 py-2 text-sm text-gray-700 hover:text-[1rem] hover:text-neutral-white hover:bg-primary-lightblue"
								role="menuitem"
								onClick={toggleDropdown}
							>
								<p> Dashboard</p>
							</Link>
						)}
						{userData?.role === 'BUYER' && (
							<Link
								to="/wishes"
								className="block px-4 py-2 text-sm text-gray-700 hover:text-[1rem] hover:text-neutral-white hover:bg-primary-lightblue"
								role="menuitem"
								onClick={toggleDropdown}
							>
								<p> My wishlist</p>
							</Link>
						)}
						<ButtonIcon
							onClick={() => {
								handleLogout(), toggleDropdown();
							}}
							className="w-full rounded-none bg-transparent text-neutral-black px-4 hover:bg-primary-lightblue hover:text-neutral-white"
							role="menuitem"
						>
							{isLoading ? (
								<>
									<IconLoader className="animate-spin mr-1" />{' '}
									{'processing....'}
								</>
							) : (
								'Logout'
							)}
						</ButtonIcon>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default ProfileDropdown;
