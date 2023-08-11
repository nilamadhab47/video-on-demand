import { renderHook } from "@testing-library/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { appsApi } from "@/utils/api";
import useMovieDetails from "@/hooks/useMovieDetails";
import "@testing-library/jest-dom";

jest.mock("@/utils/api", () => ({
  appsApi: {
    get: jest.fn(),
  },
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("useMovieDetails hook", () => {
  // Mock the movie data from Redux store
  const mockMovieData = {
    movies: [
      {
        data: [
          {
            id: "1",
            title: "Movie 1",
            genres: [{ name: "Genre1" }],
          },
          {
            id: "2",
            title: "Movie 2",
            genres: [{ name: "Genre2" }],
          },
          // Add more movies here if needed
        ],
      },
    ],
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue(mockMovieData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch and set movie details", async () => {
    const movieId = "1";
    const movieDataResponse = {
      data: {
        video: {
          id: movieId,
          title: "Test Movie",
          genres: [{ name: "Test Genre" }],
        },
      },
    };

    appsApi.get.mockResolvedValue(movieDataResponse);

    const { result, waitForNextUpdate } = renderHook(() =>
      useMovieDetails(movieId),
    );

    // Wait for the hook to fetch the movie data
    await waitForNextUpdate();

    // Ensure that the API was called with the correct movieId
    expect(appsApi.get).toHaveBeenCalledWith(`video/${movieId}`);

    // Check if the movie data is set correctly
    expect(result.current.movie).toEqual(movieDataResponse.data.video);
    expect(result.current.relatedMovies).toEqual([
      movieDataResponse.data.video,
    ]);
    expect(result.current.firstGenreMovies).toEqual([
      movieDataResponse.data.video,
    ]);
  });

  test("should return empty data when movieId is not provided", () => {
    const { result } = renderHook(() => useMovieDetails(null));

    expect(appsApi.get).not.toHaveBeenCalled();
    expect(result.current.movie).toBeNull();
    expect(result.current.relatedMovies).toEqual([]);
    expect(result.current.firstGenreMovies).toEqual([]);
  });

  test("should return empty data when movie is not found in Redux store", async () => {
    const movieId = "999"; // Movie with this ID is not in the mocked movie data
    const { result, waitForNextUpdate } = renderHook(() =>
      useMovieDetails(movieId),
    );

    await waitForNextUpdate();

    expect(appsApi.get).toHaveBeenCalledWith(`video/${movieId}`);
    expect(result.current.movie).toBeNull();
    expect(result.current.relatedMovies).toEqual([]);
    expect(result.current.firstGenreMovies).toEqual([]);
  });

  // Add more test cases as needed based on different scenarios and edge cases.
});
