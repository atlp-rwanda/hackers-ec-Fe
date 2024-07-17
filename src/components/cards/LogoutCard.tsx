import { useEffect } from 'react';
import useToast from '../../hooks/useToast';
import { Logout, resetLogoutState } from '../../redux/features/logoutSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { ButtonIcon } from '../buttons/ButtonIcon';
import IconLoader from '../Loaders/IconLoader';
import { DynamicData } from '../../@types/DynamicData';

const LogoutCard = () => {
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
		<div className="absolute bottom-full right-6 mb-6 w-[80%] p-3 bg-primary-lightblue/10 flex-center rounded-lg">
			<ButtonIcon
				className="bg-neutral-darkRed rounded-lg hover:bg-neutral-darkRed/80 w-full cursor-pointer"
				onClick={handleLogout}
			>
				{isLoading ? (
					<>
						<IconLoader className="animate-spin mr-1" /> {'processing....'}
					</>
				) : (
					'Logout'
				)}
			</ButtonIcon>
		</div>
	);
};

export default LogoutCard;
