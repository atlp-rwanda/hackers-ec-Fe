import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import About from '../pages/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';

function Routers() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/about" element={<About />} />
				</Route>
			</Routes>
		</>
	);
}

export default Routers;
