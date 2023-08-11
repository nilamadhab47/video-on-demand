import { render, screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { appsApi } from "@/utils/api";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import watchLaterSlice from "@/store/slices/watchLaterSlice";
import MovieDetails from "@/components/MovieDetails";
import "@testing-library/jest-dom";

// Create a mock API server
const server = setupServer(
  rest.post("/api/video/watchLatterOrLike/:movieId", (req, res, ctx) => {
    // Mock the response from the server
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
);

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());

describe("MovieDetails component (type: mobile)", () => {
  it("should render movie details correctly", () => {
    render(
      <MovieDetails
        title="Movie Title"
        plot="Movie Plot"
        type="mobile"
        isWatchLater={false}
      />,
    );

    const titleElement = screen.getByText("Movie Title");
    const plotElement = screen.getByText("Movie Plot");
    const watchLaterButton = screen.getByText("Watch Later");
    const watchNowButton = screen.getByText("Watch Now");

    expect(titleElement).toBeInTheDocument();
    expect(plotElement).toBeInTheDocument();
    expect(watchLaterButton).toBeInTheDocument();
    expect(watchNowButton).toBeInTheDocument();
  });

  it('should add movie to watch later list when "Watch Later" button is clicked', async () => {
    // Create a mock Redux store with the watchLaterSlice
    const store = configureStore({ reducer: { movieLater: watchLaterSlice } });

    render(
      <Provider store={store}>
        <MovieDetails
          title="Movie Title"
          plot="Movie Plot"
          type="mobile"
          isWatchLater={false}
        />
      </Provider>,
    );

    const watchLaterButton = screen.getByText("Watch Later");

    // Simulate a button click
    fireEvent.click(watchLaterButton);

    // Check if the API was called correctly
    expect(await screen.findByText("Remove Later")).toBeInTheDocument();
  });
});

describe("MovieDetails component (type: poster2)", () => {
  it("should render movie details correctly", () => {
    render(
      <MovieDetails
        title="Movie Title"
        plot="Movie Plot"
        type="poster2"
        isWatchLater={false}
      />,
    );

    const titleElement = screen.getByText("Movie Title");
    const plotElement = screen.getByText("Movie Plot");
    const watchLaterButton = screen.getByText("Watch Later");
    const watchNowButton = screen.getByText("Watch Now");

    expect(titleElement).toBeInTheDocument();
    expect(plotElement).toBeInTheDocument();
    expect(watchLaterButton).toBeInTheDocument();
    expect(watchNowButton).toBeInTheDocument();
  });

  it('should add movie to watch later list when "Watch Later" button is clicked', async () => {
    // Create a mock Redux store with the watchLaterSlice
    const store = configureStore({ reducer: { movieLater: watchLaterSlice } });

    render(
      <Provider store={store}>
        <MovieDetails
          title="Movie Title"
          plot="Movie Plot"
          type="poster2"
          isWatchLater={false}
        />
      </Provider>,
    );

    const watchLaterButton = screen.getByText("Watch Later");

    // Simulate a button click
    fireEvent.click(watchLaterButton);

    // Check if the API was called correctly
    expect(await screen.findByText("Remove Later")).toBeInTheDocument();
  });
});

// Add more test cases for other types if needed
