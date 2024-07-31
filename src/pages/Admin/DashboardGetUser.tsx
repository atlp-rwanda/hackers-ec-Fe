import { MdOutlineSearch } from 'react-icons/md';
import { FaArrowCircleLeft } from 'react-icons/fa';
import GetUser from '../../components/adminDashboard/getUser';
import { useLocation } from 'react-router-dom';
const AdminDashboardAllUser = () => {
	const location = useLocation();
	return (
		<div className="content h-full pl-5 ipad:pl-0 w-full">
			<GetUser
				searchIcon={<MdOutlineSearch />}
				arrow={<FaArrowCircleLeft />}
				location={location.pathname}
			/>
		</div>
	);
};

export default AdminDashboardAllUser;
