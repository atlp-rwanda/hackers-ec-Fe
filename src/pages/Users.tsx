import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import {
	fetchUsersStart,
	fetchUsersSuccess,
	fetchUsersFailure,
} from "../redux/features/userSlice";
import { API } from "../utils/api";
import { DynamicData } from "../@types/DynamicData";

const Users = () => {
	const dispatch = useAppDispatch();
	const {
		data: users,
		loading,
		error,
	} = useAppSelector((state) => state.users);

	const fetchUsers = async () => {
		dispatch(fetchUsersStart());
		try {
			const res = await API.get("/users");
			if (Array.isArray(res.data)) {
				dispatch(fetchUsersSuccess(res.data));
			} else {
				throw new Error("Data format is not an array");
			}
		} catch (error) {
			console.error("Failed to fetch users", error);
			dispatch(fetchUsersFailure("Failed to fetch users"));
		}
	};

	return (
		<div>
			<button onClick={fetchUsers}>Get Users</button>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			<ul>
				{users.map((user: DynamicData) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Users;
