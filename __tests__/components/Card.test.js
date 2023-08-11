import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "@/components/Card";
// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
    replace: jest.fn(), // Mock the router replace function
  })),
}));
describe("Card Component", () => {
  it("renders card title correctly", () => {
    const title = "Sample Movie";
    const image = "/path/to/image.jpg";
    const time = 120; // Time in minutes
    render(<Card title={title} image={image} time={time} />);

    // Assert that the card title is rendered correctly
    const cardTitle = screen.getByText(title);
    expect(cardTitle).toBeInTheDocument();
  });

  test("displays Watch Now link with correct href", () => {
    const title = "Sample Movie";
    const image = "/path/to/image.jpg";
    const time = 120; // Time in minutes
    render(<Card title={title} image={image} time={time} />);

    // Assert that the Watch Now link has the correct href
    const watchNowLink = screen.getByText("Watch Now");
    expect(watchNowLink.getAttribute("href")).toBe(
      "/videoplayer/TheTomorrowWar.mp4",
    );
  });

  test("displays time in the correct format", () => {
    const title = "Sample Movie";
    const image = "/path/to/image.jpg";
    const time = 180; // Time in minutes
    render(<Card title={title} image={image} time={time} />);

    // Assert that the time is displayed in the correct format
    const formattedTime = screen.getByText("3h 0m");
    expect(formattedTime).toBeInTheDocument();
  });

  // Add more test cases to cover other behaviors of the Card component
});
