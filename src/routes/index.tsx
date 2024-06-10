import Home from "../pages/Home";
import About from "../pages/About";
import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";
import Users from "../pages/Users";
import OtherUsers from "../pages/OtherUsers";

function Routers() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="users" element={<Users />} />
					<Route path="other-users" element={<OtherUsers />} />
				</Route>
			</Routes>
		</>
	);
}

export default Routers;
