import { useParams } from 'react-router-dom';

import EditUserForm from '../../components/Forms/editUserForm';
import GetUser from '../../components/adminDashboard/getUser';

const EditUser = () => {
	const { id } = useParams<string>();
	return (
		<div className="content  h-full ipad:pl-0 w-full">
			<GetUser />
			<EditUserForm id={id} />
		</div>
	);
};

export default EditUser;
