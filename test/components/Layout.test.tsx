import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../src/components/Footer";
import Nav from "../../src/components/Nav";
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
