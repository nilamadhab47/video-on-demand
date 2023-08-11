// ProfileCard.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import ProfileCard from "@/components/ProfileCard";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ProfileCard Component", () => {
  const mockProfile = {
    profileImage:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    profileName: "John Doe",
    manageProfileClicked: true,
    key: 1,
    href: "john-doe",
  };

  test("renders profile card with edit button when manageProfileClicked is true", () => {
    render(<ProfileCard {...mockProfile} />);

    const profileImage = screen.getByAltText("profile pic");
    const editButton = screen.getByAltText("edit profile");
    const profileName = screen.getByText("John Doe");

    expect(profileImage).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(profileName).toBeInTheDocument();
  });

  test("renders profile card without edit button when manageProfileClicked is false", () => {
    const mockProfileWithoutEdit = {
      ...mockProfile,
      manageProfileClicked: false,
    };
    render(<ProfileCard {...mockProfileWithoutEdit} />);

    const profileImage = screen.getByAltText("profile pic");
    const editButton = screen.queryByAltText("edit profile");
    const profileName = screen.getByText("John Doe");

    expect(profileImage).toBeInTheDocument();
    expect(editButton).toBeNull();
    expect(profileName).toBeInTheDocument();
  });

  test("navigates to correct profile page when the profile image is clicked", () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });

    render(<ProfileCard {...mockProfile} />);

    const profileImage = screen.getByAltText("profile pic");
    fireEvent.click(profileImage);

    expect(mockPush).toHaveBeenCalledWith("profile/john-doe");
  });
});
