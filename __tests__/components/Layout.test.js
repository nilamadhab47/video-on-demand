import { render, screen } from "@testing-library/react";
import Layout from "@/components/Layout";
import "@testing-library/jest-dom";

describe("Layout component", () => {
  it("renders the header and main sections correctly", () => {
    render(<Layout />);

    const headerText = screen.getByText("Video On Demand");
    const signInLink = screen.getByText("Sign In");
    const mainSection = screen.getByRole("main");

    expect(headerText).toBeInTheDocument();
    expect(signInLink).toBeInTheDocument();
    expect(mainSection).toBeInTheDocument();
  });

  it("renders the compatible sections with correct headings and descriptions", () => {
    render(<Layout />);

    const compatibleHeadings = screen.getAllByRole("heading", { level: 3 });
    const compatibleDescriptions = screen.getAllByRole("paragraph");

    expect(compatibleHeadings).toHaveLength(2);
    expect(compatibleHeadings[0]).toHaveTextContent(
      "Compatible with All devices",
    );
    expect(compatibleHeadings[1]).toHaveTextContent("Easy sign-up");

    expect(compatibleDescriptions).toHaveLength(2);
    expect(compatibleDescriptions[0]).toHaveTextContent(
      "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    );
    expect(compatibleDescriptions[1]).toHaveTextContent(
      "Sign-up in two clicks and access our catalogue immediately",
    );
  });

  it('renders the "Why You Should Join" section with correct images and descriptions', () => {
    render(<Layout />);

    const whyYouShouldJoinItems = screen.getAllByRole("listitem");
    expect(whyYouShouldJoinItems).toHaveLength(3); // Assuming `whyYouShouldJoin` array has 3 items

    const images = screen.getAllByAltText("v-img");
    expect(images).toHaveLength(3); // Assuming `whyYouShouldJoin` array has 3 items

    const descriptions = screen.getAllByRole("paragraph");
    expect(descriptions).toHaveLength(3); // Assuming `whyYouShouldJoin` array has 3 items
  });
});
