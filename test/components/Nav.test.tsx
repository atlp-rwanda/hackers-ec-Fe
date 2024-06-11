import Nav from "../../src/components/Nav";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

describe("Nav Component", () => {
	it("renders the Home link", () => {
		render(
			<MemoryRouter>
				<Nav />
			</MemoryRouter>,
		);

		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("renders the About link", () => {
		render(
			<MemoryRouter>
				<Nav />
			</MemoryRouter>,
		);
		expect(screen.getByText("About")).toBeInTheDocument();
	});
});
