/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { fetchWishes } from '../redux/features/getUserwishes';
import useToast from './useToast';

const useWish = () => {
	const data = useAppSelector(
		(state) => state.fetchWishes.data[state.fetchWishes.data.length - 1]?.data,
	);
	const { isLoading } = useAppSelector((state) => state.fetchWishes);
	const { showErrorMessage } = useToast();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchWishes())
			.unwrap()
			.catch((error) => {
				showErrorMessage(error.message || 'Failed to load wishes');
			});
	}, [dispatch]);
	return { data, isLoading };
};
export default useWish;
