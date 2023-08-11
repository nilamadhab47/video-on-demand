import SkeletonCard from "@/components/LoadingSkeleton";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("SkeletonCard component", () => {
  it("renders the skeleton card with correct classes", () => {
    render(<SkeletonCard />);

    const skeletonCardContainer = screen.getByTestId("skeleton-card");
    const skeletonLines = screen.getAllByRole("listitem");

    // Check if the skeleton card container and skeleton lines are present
    expect(skeletonCardContainer).toBeInTheDocument();
    expect(skeletonLines).toHaveLength(4);

    // Check if the skeleton card has the correct classes
    expect(skeletonCardContainer).toHaveClass(
      "w-[143px] sm:w-60 aspect-[240/360] bg-red-900 rounded-lg shadow-md animate-pulse",
    );
  });

  it("renders the skeleton lines correctly", () => {
    render(<SkeletonCard />);

    const skeletonLines = screen.getAllByRole("listitem");

    // Check if the skeleton lines are present
    expect(skeletonLines).toHaveLength(4);

    // Check if each skeleton line has the correct classes for the loading animation
    skeletonLines.forEach((line) => {
      expect(line).toHaveClass("bg-red-900");
      expect(line).toHaveClass("bg-gray-300");
      expect(line).toHaveClass("h-4");
      expect(line).toHaveClass("rounded");
      expect(line).toHaveClass("animate-pulse");
    });
  });
});
