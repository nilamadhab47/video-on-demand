import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Caraousel from "@/components/Caraousel";

const mockMovieList = [
  "https://i0.wp.com/www.newsbugz.com/wp-content/uploads/2021/11/Ayodhi-Movie-1.jpg?w=1280&ssl=1",
  "https://telecomtalk.info/wp-content/uploads/2023/02/action-comedy-movies-on-netflix-this-weekend.jpg",
  "https://www.tamilanjobs.com/wp-content/uploads/2023/03/selfiee-movie-review-2.jpg",
  "https://i0.wp.com/www.newsbugz.com/wp-content/uploads/2021/11/Ayodhi-Movie-1.jpg?w=1280&ssl=1",
  "https://telecomtalk.info/wp-content/uploads/2023/02/action-comedy-movies-on-netflix-this-weekend.jpg",
  "https://www.tamilanjobs.com/wp-content/uploads/2023/03/selfiee-movie-review-2.jpg",
];

describe("Caraousel", () => {
  test("renders the carousel with images and buttons", () => {
    render(<Caraousel movieList={mockMovieList} />);

    const carouselElement = screen.getByRole("list");
    expect(carouselElement).toBeInTheDocument();

    // Check if all images are present in the carousel
    const imageElements = screen.getAllByRole("img");
    expect(imageElements).toHaveLength(mockMovieList.length);

    // Check if "Watch Now" and "Watch Later" buttons are present for each image
    const watchNowButtons = screen.getAllByText(/Watch Now/i);
    const watchLaterButtons = screen.getAllByText(/Watch Later/i);
    expect(watchNowButtons).toHaveLength(mockMovieList.length);
    expect(watchLaterButtons).toHaveLength(mockMovieList.length);
  });

  test("carousel navigation", () => {
    render(<Caraousel movieList={mockMovieList} />);

    // Get the carousel container
    const carouselContainer = screen.getByTestId("carousel-container");

    // Simulate carousel navigation by clicking the carousel container
    fireEvent.click(carouselContainer);
    // You can now assert that the carousel has navigated to the next slide
    // For example, check if a specific image or content is visible after navigation
    // You can also repeat this process to test previous slide navigation.

    // Add more tests for specific navigation scenarios as needed.
  });

  test('clicking "Watch Now" button', () => {
    // Mock a function to handle the button click
    const mockHandleWatchNow = jest.fn();

    render(
      <Caraousel
        movieList={mockMovieList}
        handleWatchNow={mockHandleWatchNow}
      />,
    );

    // Get the "Watch Now" button for the first image
    const watchNowButton = screen.getByText(/Watch Now/i);

    // Simulate a button click
    fireEvent.click(watchNowButton);

    // Assert that the mock function has been called
    expect(mockHandleWatchNow).toHaveBeenCalled();

    // You can add more tests to verify the function's behavior after being called.
  });

  // Add more test cases as needed to cover other interactions and scenarios.
});
