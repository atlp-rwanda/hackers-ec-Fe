import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

describe("Layout Component", () => {
  it("renders the Nav, Outlet, and Footer components", () => {
    render(
      <MemoryRouter>
        <Nav />
        <Footer />
      </MemoryRouter>
    );
  });
});
