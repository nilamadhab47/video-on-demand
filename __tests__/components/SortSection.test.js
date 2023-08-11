// SortSection.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortSection from "@/components/SortSection";
import "@testing-library/jest-dom";

describe("SortSection Component", () => {
  test("renders with preference section visible", () => {
    render(<SortSection showPreference={true} showSortBy={false} />);

    const preferenceSection = screen.getByText("Set your preferences");
    const sortBySection = screen.queryByText("Sort By");

    expect(preferenceSection).toBeInTheDocument();
    expect(sortBySection).toBeNull();
  });

  test("renders with sortBy section visible", () => {
    render(<SortSection showPreference={false} showSortBy={true} />);

    const preferenceSection = screen.queryByText("Set your preferences");
    const sortBySection = screen.getByText("Sort By");

    expect(preferenceSection).toBeNull();
    expect(sortBySection).toBeInTheDocument();
  });

  test("preference section hidden when showPreference is false", () => {
    render(<SortSection showPreference={false} showSortBy={false} />);

    const preferenceSection = screen.queryByText("Set your preferences");

    expect(preferenceSection).toBeNull();
  });

  test("sortBy section hidden when showSortBy is false", () => {
    render(<SortSection showPreference={true} showSortBy={false} />);

    const sortBySection = screen.queryByText("Sort By");

    expect(sortBySection).toBeNull();
  });

  test("correctly handles OriginalLanguage select change", () => {
    render(<SortSection showPreference={true} showSortBy={false} />);

    const originalLanguageSelect = screen.getByLabelText("Original Languages");
    fireEvent.change(originalLanguageSelect, { target: { value: "hindi" } });

    expect(originalLanguageSelect.value).toBe("hindi");
  });

  test("correctly handles language select change", () => {
    render(<SortSection showPreference={true} showSortBy={false} />);

    const languageSelect = screen.getByLabelText("Language");
    fireEvent.change(languageSelect, { target: { value: "spanish" } });

    expect(languageSelect.value).toBe("spanish");
  });

  test("correctly handles Sort select change", () => {
    render(<SortSection showPreference={false} showSortBy={true} />);

    const sortSelect = screen.getByLabelText("Sort By");
    fireEvent.change(sortSelect, { target: { value: "topRated" } });

    expect(sortSelect.value).toBe("topRated");
  });
});
