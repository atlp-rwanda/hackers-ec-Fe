import { useParams } from 'react-router-dom';

import EditUserForm from '../../components/Forms/editUserForm';
import GetUser from '../../components/adminDashboard/getUser';
import { userType } from '../../@types/userType';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { useEffect } from 'react';
import { getUser } from '../../redux/features/getUserSlice';

const EditUser = () => {
	const { id } = useParams<string>();
	const dispatch = useAppDispatch();
	const users = useAppSelector(
		(state) => state.allUsers.data[state.allUsers.data.length - 1],
	);
	useEffect(() => {
		dispatch(getUser()).unwrap();
	}, [dispatch]);

	const getUserInfo = () => {
		return users?.data.filter((item: userType) => item?.id === id) || '';
	};
	const useR = getUserInfo();
	return (
		<div className="content  h-full ipad:pl-0 w-full">
			<GetUser />
			<EditUserForm id={id} useR={useR} />
		</div>
	);
};

export default EditUser;
