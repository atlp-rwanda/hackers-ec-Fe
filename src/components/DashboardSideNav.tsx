import { Triangle } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { fetchUserProfile } from '../redux/features/userUpdateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { appLogo } from '../utils/images';
import LogoutCard from './cards/LogoutCard';

const DashboardSideNav = ({
	children,
	otherStyles,
	role,
}: {
	children: ReactNode;
	otherStyles: string;
	role: string;
}) => {
	const [active, setActive] = useState(false);
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.profile);
	useEffect(() => {
		dispatch(fetchUserProfile()).unwrap();
	}, [dispatch]);

	return (
		<aside
			className={`${otherStyles} h-screen bg-neutral-white fixed ipad:sticky top-0 left-0 z-40`}
		>
			<nav className="h-full flex flex-col justify-between border-r border-neutral-grey/30 shadow-sm">
				<div className="p-5 pb-2 flex gap-3 items-center">
					<img src={appLogo} alt="website logo" className="w-16" />
					<h2 className="text-2xl font-semibold">ShopTrove</h2>
				</div>
				<ul className="flex-1 mt-3">{children}</ul>
				<div className="relative flex gap-3 items-center p-3">
					<img
						src={data?.profileImage}
						alt="website logo"
						className="w-14 h-14 rounded-full"
					/>
					<div className="flex flex-col flex-1 p-2">
						<h4 className="text-lg">{role}</h4>
						<p className="text-xs text-neutral-black/60">{data?.lastName}</p>
					</div>
					<div
						onClick={() => setActive((curr) => !curr)}
						className="px-1 py-2 cursor-pointer rounded"
					>
						<Triangle
							fill="black"
							size={26}
							className={`${active ? '' : 'rotate-180'}`}
						/>
					</div>
					{active && <LogoutCard />}
				</div>
			</nav>
		</aside>
	);
};

export default DashboardSideNav;
