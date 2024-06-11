import { render } from "@testing-library/react";
import Home from "../../src/pages/Home";

describe("Home components", () => {
	it("render the correct content", () => {
		render(<Home />);
	});
});
