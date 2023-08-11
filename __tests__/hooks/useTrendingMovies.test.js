import { renderHook } from "@testing-library/react-hooks";
import { appsApi } from "@/utils/api";
import useTrendingMovies from "@/hooks/useTrendingMovies";

jest.mock("@/utils/api", () => ({
  appsApi: {
    get: jest.fn(() => ({
      data: {
        results: [
          {
            category: "Action",
            data: [
              { videoId: "1" },
              { videoId: "2" },
              // Add more data here if needed
            ],
          },
          // Add more results here if needed
        ],
      },
    })),
  },
}));

test("should initialize trendingMovies with an empty array", () => {
  const { result } = renderHook(() => useTrendingMovies());
  expect(result.current).toEqual([]);
});

test("should fetch trending movies and update the state", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useTrendingMovies());

  // The hook uses useEffect, so we need to wait for its completion
  await waitForNextUpdate();

  expect(appsApi.get).toHaveBeenCalledWith(
    "video/get-upcoming-toprated-videos/Adult",
  );

  expect(result.current).toEqual([
    {
      category: "Action",
      videoIds: ["1", "2"],
    },
    // Add more expected data here if needed
  ]);
});

test("should handle error when fetching trending movies", async () => {
  const consoleWarnSpy = jest.spyOn(console, "warn");
  consoleWarnSpy.mockImplementation(() => {}); // Mock console.warn to avoid logs during the test

  const { result, waitForNextUpdate } = renderHook(() => useTrendingMovies());

  // The hook uses useEffect, so we need to wait for its completion
  await waitForNextUpdate();

  expect(appsApi.get).toHaveBeenCalledWith(
    "video/get-upcoming-toprated-videos/Adult",
  );

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot",
  );

  expect(result.current).toEqual([]);

  consoleWarnSpy.mockRestore(); // Restore the original console.warn implementation
});
