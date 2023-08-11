import CommonHorizontalList from "@/components/CommonHorizontalList";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import "@testing-library/jest-dom/extend-expect"; // For additional expect matchers
import { setupServer } from "msw/node";
const server = setupServer(
  rest.post("/video/watchLatterOrLike/:movieId", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete("/video/watchLatterOrLike/:movieId", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
    replace: jest.fn(), // Mock the router replace function
  })),
}));
describe("CommonHorizontalList", () => {
  const mockData = [
    // Add your mocked data for testing here
    // For example, you can have an array of movie objects
    // Ensure that it matches the "data" prop expected by the component
    {
      Title: "The Avengers",
      Year: "2012",
      Rated: "PG-13",
      Released: "04 May 2012",
      Runtime: "143 min",
      Genre: "Action, Adventure, Sci-Fi",
      Director: "Joss Whedon",
      Writer: "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
      Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
      Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      Language: "English, Russian, Hindi",
      Country: "USA",
      Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.0/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "91%",
        },
        {
          Source: "Metacritic",
          Value: "69/100",
        },
      ],
      Metascore: "69",
      imdbRating: "8.0",
      imdbVotes: "1,216,895",
      imdbID: "tt0848228",
      Type: "movie",
      DVD: "25 Sep 2012",
      BoxOffice: "$623,279,547",
      Production: "Walt Disney Pictures",
      Website: "N/A",
      Response: "True",
    },
  ];

  test("renders movie list items", () => {
    render(
      <CommonHorizontalList
        title="Movie List"
        type="movieList"
        data={mockData}
      />,
    );
    const movieItems = screen.queryAllByTestId("movie-item");
    expect(movieItems.length).toBe(mockData.length);
  });

  test("handleBookmarkClick should toggle like status", async () => {
    const movieId = 123;
    render(
      <CommonHorizontalList
        title="Movie List"
        type="movieList"
        data={mockData}
      />,
    );
    const likeButton = screen.getByTestId(`like-button-${movieId}`);

    // Before clicking, the movie should not be liked
    expect(likeButton).toHaveTextContent("Like");
    fireEvent.click(likeButton);

    // Wait for the API call to finish and the component to re-render
    await waitFor(() => {
      expect(likeButton).toHaveTextContent("Liked");
    });

    fireEvent.click(likeButton);

    // Wait for the API call to finish and the component to re-render
    await waitFor(() => {
      expect(likeButton).toHaveTextContent("Like");
    });
  });

  test("handleBookmarkClick should toggle watch later status", async () => {
    const movieId = 456;
    render(
      <CommonHorizontalList
        title="Movie List"
        type="movieList"
        data={mockData}
      />,
    );
    const watchLaterButton = screen.getByTestId(
      `watch-later-button-${movieId}`,
    );

    // Before clicking, the movie should not be in watch later list
    expect(watchLaterButton).toHaveTextContent("Watch Later");
    fireEvent.click(watchLaterButton);

    // Wait for the API call to finish and the component to re-render
    await waitFor(() => {
      expect(watchLaterButton).toHaveTextContent("Added to Watch Later");
    });

    fireEvent.click(watchLaterButton);

    // Wait for the API call to finish and the component to re-render
    await waitFor(() => {
      expect(watchLaterButton).toHaveTextContent("Watch Later");
    });
  });

  // You can write more test cases to cover other scenarios or interactions.
});
