import Footer from "@/components/Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Footer", () => {
  test("renders footer links correctly", () => {
    render(<Footer />);

    const homeLink = screen.getByText("Home");
    const kidsLink = screen.getByText("Kids");
    const myListLink = screen.getByText("My List");
    const newPopularLink = screen.getByText("New & Popular");
    const browseLink = screen.getByText("Browse");

    expect(homeLink).toBeInTheDocument();
    expect(kidsLink).toBeInTheDocument();
    expect(myListLink).toBeInTheDocument();
    expect(newPopularLink).toBeInTheDocument();
    expect(browseLink).toBeInTheDocument();
  });

  test("renders footer secondary links correctly", () => {
    render(<Footer />);

    const termsLink = screen.getByText("Terms & Conditions");
    const aboutUsLink = screen.getByText("About Us");
    const privacyPolicyLink = screen.getByText("Privacy Policy");
    const contactLink = screen.getByText("Contact");
    const faqLink = screen.getByText("FAQ");

    expect(termsLink).toBeInTheDocument();
    expect(aboutUsLink).toBeInTheDocument();
    expect(privacyPolicyLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
  });

  test("renders language selection correctly", () => {
    render(<Footer />);

    const languageSelect = screen.getByRole("combobox");
    const englishOption = screen.getByText("English");
    const hindiOption = screen.getByText("Hindi");

    expect(languageSelect).toBeInTheDocument();
    expect(englishOption).toBeInTheDocument();
    expect(hindiOption).toBeInTheDocument();
  });
});
