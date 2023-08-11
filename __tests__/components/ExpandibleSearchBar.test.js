import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import ExpandibleSearchBar from "@/components/ExpandibleSearchBar";

// Mock the useRouter hook to capture router.push calls
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock the movies data for testing
const mockMoviesData = [
  {
    data: [{ title: "Avengers" }, { title: "Avatar" }],
  },
  {
    data: [{ title: "Batman Begins" }, { title: "The Dark Knight" }],
  },
];

// Mock the custom hook useMoviesData
jest.mock("../../src/hooks/movieData.js", () => () => mockMoviesData);

describe("ExpandibleSearchBar", () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));

    render(
      <ExpandibleSearchBar handleBackClick={() => {}} showSearchBar={true} />,
    );
  });

  test("renders search bar correctly", () => {
    const searchInput = screen.getByPlaceholderText("Search for a movie...");
    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("typing in the search input updates the search query state", () => {
    render(
      <ExpandibleSearchBar handleBackClick={() => {}} showSearchBar={true} />,
    );

    const searchInput = screen.getByPlaceholderText("Search for a movie...");
    const movieName = "The Shawshank Redemption";

    fireEvent.change(searchInput, { target: { value: movieName } });

    expect(searchInput.value).toBe(movieName);
  });

  test("renders movie title suggestions when typing in the search input", () => {
    render(
      <ExpandibleSearchBar handleBackClick={() => {}} showSearchBar={true} />,
    );

    const searchInput = screen.getByPlaceholderText("Search for a movie...");
    const partialMovieName = "Av";

    fireEvent.change(searchInput, { target: { value: partialMovieName } });

    const suggestionList = screen.getByRole("list");
    expect(suggestionList).toBeInTheDocument();

    const suggestions = screen.getAllByRole("listitem");
    expect(suggestions.length).toBeGreaterThan(0);
  });

  test("clicking on a suggestion updates the selected movie and search query state", () => {
    render(
      <ExpandibleSearchBar handleBackClick={() => {}} showSearchBar={true} />,
    );

    const searchInput = screen.getByPlaceholderText("Search for a movie...");
    const partialMovieName = "Av";

    fireEvent.change(searchInput, { target: { value: partialMovieName } });

    const suggestion = screen.getAllByRole("listitem")[0];
    fireEvent.click(suggestion);

    expect(searchInput.value).toBe(suggestion.textContent);
  });

  test("submitting the search form navigates to the searchedMovie page", () => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));

    render(
      <ExpandibleSearchBar handleBackClick={() => {}} showSearchBar={true} />,
    );

    const searchInput = screen.getByPlaceholderText("Search for a movie...");
    const movieName = "The Shawshank Redemption";

    fireEvent.change(searchInput, { target: { value: movieName } });
    fireEvent.submit(screen.getByRole("form"));

    expect(useRouter().push).toHaveBeenCalledWith({
      pathname: "/searchedMovie",
      query: { query: movieName },
    });
  });
});
