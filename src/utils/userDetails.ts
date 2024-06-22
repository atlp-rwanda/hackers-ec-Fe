import { jwtDecode } from 'jwt-decode';

const fetchInfo = () => {
	const token: string = localStorage.getItem('access_token') || '';
	try {
		return jwtDecode(token);
	} catch (error) {
		return null;
	}
};

export default fetchInfo;
