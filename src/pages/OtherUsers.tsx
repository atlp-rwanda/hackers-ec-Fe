import { useAppSelector } from "../redux/hooks/hooks";
import { DynamicData } from "../@types/DynamicData";

const OtherUsers = () => {
	const users = useAppSelector((state) => state.users.data);

	return (
		<div>
			{users.map((user: DynamicData) => (
				<div key={user.id}>{user.name}</div>
			))}
		</div>
	);
};

export default OtherUsers;
