import Home from "../pages/Home";
import About from "../pages/About";
import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";

function Routers() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routers;
