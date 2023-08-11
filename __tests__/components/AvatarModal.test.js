import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvatarModal from "@/components/AvatarModal";

describe("AvatarModal", () => {
  test("renders without errors", () => {
    const setIsOpenMock = jest.fn();
    const handleImageMock = jest.fn();
    render(
      <AvatarModal setIsOpen={setIsOpenMock} handleImage={handleImageMock} />,
    );
    expect(screen.getByText("Select Your Avatar")).toBeInTheDocument();
  });

  test("displays all avatar images", () => {
    const setIsOpenMock = jest.fn();
    const handleImageMock = jest.fn();
    render(
      <AvatarModal setIsOpen={setIsOpenMock} handleImage={handleImageMock} />,
    );

    // Check if all avatar images are rendered
    const avatarImages = screen.getAllByAltText("avatar-images");
    expect(avatarImages.length).toBe(8); // Assuming there are 8 images
  });

  test("calls handleImage when an avatar image is clicked", () => {
    const setIsOpenMock = jest.fn();
    const handleImageMock = jest.fn();
    render(
      <AvatarModal setIsOpen={setIsOpenMock} handleImage={handleImageMock} />,
    );

    // Click on the first avatar image
    const avatarImage = screen.getAllByAltText("avatar-images")[0];
    fireEvent.click(avatarImage);

    // handleImage should have been called with the index of the clicked image
    expect(handleImageMock).toHaveBeenCalledWith(0);
  });

  test("closes the modal when the Close button is clicked", () => {
    const setIsOpenMock = jest.fn();
    const handleImageMock = jest.fn();
    render(
      <AvatarModal setIsOpen={setIsOpenMock} handleImage={handleImageMock} />,
    );

    // Click the Close button
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // setIsOpen should have been called with false
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });

  test("closes the modal when the Submit button is clicked", () => {
    const setIsOpenMock = jest.fn();
    const handleImageMock = jest.fn();
    render(
      <AvatarModal setIsOpen={setIsOpenMock} handleImage={handleImageMock} />,
    );

    // Click the Submit button
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // setIsOpen should have been called with false
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});
