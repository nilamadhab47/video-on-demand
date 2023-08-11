import useMovieSearch from "@/hooks/useMovieSearch";
import { renderHook, act } from "@testing-library/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import "@testing-library/jest-dom";
// Mock Redux store
const mockAppsApiGet = jest.fn();
jest.mock("@/utils/api", () => ({
  appsApi: {
    get: mockAppsApiGet,
  },
}));

const mockMoviesData = [
  {
    id: 1,
    data: [
      { id: 101, title: "Movie 1", categories: [1, 2] },
      { id: 102, title: "Movie 2", categories: [2, 3] },
    ],
  },
  {
    id: 2,
    data: [
      { id: 201, title: "Movie 3", categories: [4] },
      { id: 202, title: "Movie 4", categories: [2] },
    ],
  },
];

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("useMovieSearch", () => {
  // Mock useDispatch
  const dispatchMock = jest.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  it("should return correct initial state", () => {
    useSelector.mockReturnValue({ movies: mockMoviesData });
    const { result } = renderHook(() => useMovieSearch());

    expect(result.current.searchQuery).toBe("");
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.relatedMovies).toEqual([]);
    expect(typeof result.current.handleSearch).toBe("function");
  });

  it("should update searchQuery when handleSearch is called", () => {
    useSelector.mockReturnValue({ movies: mockMoviesData });
    const { result } = renderHook(() => useMovieSearch());

    act(() => {
      result.current.handleSearch("Movie 2");
    });

    expect(result.current.searchQuery).toBe("Movie 2");
  });

  it("should filter movies correctly when handleSearch is called", () => {
    useSelector.mockReturnValue({ movies: mockMoviesData });
    const { result } = renderHook(() => useMovieSearch());

    act(() => {
      result.current.handleSearch("Movie 2");
    });

    expect(result.current.searchResults).toEqual([
      { id: 102, title: "Movie 2", categories: [2, 3] },
    ]);
  });

  it("should update relatedMovies when searchResults change", () => {
    useSelector.mockReturnValue({ movies: mockMoviesData });
    const { result, rerender } = renderHook(() => useMovieSearch());

    act(() => {
      result.current.handleSearch("Movie 2");
    });

    expect(result.current.relatedMovies).toEqual([
      { id: 101, title: "Movie 1", categories: [1, 2] },
      { id: 202, title: "Movie 4", categories: [2] },
    ]);

    // Rerender with different search query
    act(() => {
      result.current.handleSearch("Movie 3");
    });

    expect(result.current.relatedMovies).toEqual([
      { id: 201, title: "Movie 3", categories: [4] },
      { id: 102, title: "Movie 2", categories: [2, 3] },
    ]);

    // Rerender with no search query
    act(() => {
      result.current.handleSearch("");
    });

    expect(result.current.relatedMovies).toEqual([]);
  });
});
