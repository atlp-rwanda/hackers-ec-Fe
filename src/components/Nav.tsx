import { Link } from "react-router-dom";
export default function Nav() {
	return (
		<div>
			<ul className="flex gap-4">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					{" "}
					<Link to="/about">About</Link>
				</li>
				<li>
					{" "}
					<Link to="/users">Users</Link>
				</li>
				<li>
					{" "}
					<Link to="/other-users">OtherUsers</Link>
				</li>
			</ul>
		</div>
	);
}
