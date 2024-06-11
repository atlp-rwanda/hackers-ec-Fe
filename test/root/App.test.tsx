import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";

describe("App Component", () => {
	it("renders Home and About pages within Layout", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
		);
	});
});
