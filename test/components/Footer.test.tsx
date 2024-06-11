import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";

describe("Footer component", () => {
	it("renders the correct content", () => {
		render(<Footer />);

		expect(screen.getByText("This is footer.")).toBeInTheDocument();
	});
});
