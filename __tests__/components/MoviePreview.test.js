import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MoviePage from "@/components/MoviePreview";
import "@testing-library/jest-dom";

describe("MoviePage component", () => {
  const mockMovieUrl = "https://example.com/movie.mp4";

  // Mock the video element's properties and methods
  beforeAll(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: jest.fn().mockImplementation(() => Promise.resolve()),
    });

    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: jest.fn().mockImplementation(() => Promise.resolve()),
    });
  });

  // Reset the mock implementation after each test
  afterEach(() => {
    HTMLMediaElement.prototype.play.mockClear();
    HTMLMediaElement.prototype.pause.mockClear();
  });

  it("should render loading spinner initially", () => {
    render(<MoviePage movieUrl={mockMovieUrl} />);
    const loadingSpinner = screen.getByText("Loading...");

    expect(loadingSpinner).toBeInTheDocument();
  });

  it("should start playback and hide the loading spinner after video is loaded", () => {
    render(<MoviePage movieUrl={mockMovieUrl} />);
    const videoElement = screen.getByRole("video");

    // Trigger the 'loadedmetadata' event to simulate the video loading
    const event = new Event("loadedmetadata");
    videoElement.dispatchEvent(event);

    const loadingSpinner = screen.queryByText("Loading...");
    const videoDisplay = screen.queryByRole("video");

    expect(loadingSpinner).toBeNull(); // Loading spinner should not be visible
    expect(videoDisplay).toBeInTheDocument(); // Video should be visible
    expect(videoElement.play).toHaveBeenCalledTimes(1); // Video play function should be called
  });

  it("should restart playback every 10 seconds", () => {
    render(<MoviePage movieUrl={mockMovieUrl} />);
    const videoElement = screen.getByRole("video");

    // Trigger the 'loadedmetadata' event to simulate the video loading
    const event = new Event("loadedmetadata");
    videoElement.dispatchEvent(event);

    // Simulate 10 seconds passing (end of playback interval)
    jest.advanceTimersByTime(10000);

    expect(videoElement.currentTime).toBeGreaterThan(0); // Playback has restarted
  });

  it("should not display video controls and autoplay the video", () => {
    render(<MoviePage movieUrl={mockMovieUrl} />);
    const videoElement = screen.getByRole("video");

    // Trigger the 'loadedmetadata' event to simulate the video loading
    const event = new Event("loadedmetadata");
    videoElement.dispatchEvent(event);

    expect(videoElement.controls).toBe(false); // Video controls should be hidden
    expect(videoElement.autoplay).toBe(true); // Video should autoplay
  });

  it("should pause video when user clicks on the video", () => {
    render(<MoviePage movieUrl={mockMovieUrl} />);
    const videoElement = screen.getByRole("video");

    // Trigger the 'loadedmetadata' event to simulate the video loading
    const event = new Event("loadedmetadata");
    videoElement.dispatchEvent(event);

    userEvent.click(videoElement); // Simulate user click on the video

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1); // Video pause function should be called
  });
});
