import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddOrEditProfile from "@/components/addOrEditProfile";
// Mock the next/image module
jest.mock("next/image", () => {
  return ({ src, alt, ...rest }) => <img src={src} alt={alt} {...rest} />;
});

// Mock the AvatarModal component
jest.mock("../../src/components/AvatarModal", () => {
  return (props) => (
    <div>
      <button onClick={() => props.setIsOpen(true)}>Open Modal</button>
    </div>
  );
});

describe("AddOrEditProfile", () => {
  test('renders "Add New Profile" text when isProfileEditable is false', () => {
    const { container } = render(
      <AddOrEditProfile isProfileEditable={false} />,
    );
    expect(container).toHaveTextContent("Add New Profile");
  });

  test('renders "Edit your profile" text when isProfileEditable is true', () => {
    const { container } = render(<AddOrEditProfile isProfileEditable={true} />);
    expect(container).toHaveTextContent("Edit your profile");
  });

  test("opens the AvatarModal when the edit button is clicked", () => {
    render(<AddOrEditProfile isProfileEditable={true} />);
    const editButton = screen.getByRole("button", { name: "Open Modal" });

    fireEvent.click(editButton);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  test("renders an input field with a given name", () => {
    const name = "John Doe";
    render(<AddOrEditProfile isProfileEditable={false} name={name} />);
    const inputElement = screen.getByPlaceholderText("Enter username");
    expect(inputElement).toHaveValue(name);
  });

  test("toggles the adult checkbox when clicked", () => {
    render(<AddOrEditProfile isProfileEditable={false} />);
    const checkbox = screen.getByLabelText("Adult");

    // Checkbox should be unchecked by default
    expect(checkbox).not.toBeChecked();

    // Clicking the checkbox should toggle its state
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Clicking it again should untoggle it
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("changes the profile image when a different image is selected", () => {
    const images = [
      { src: "/image1.jpg" },
      { src: "/image2.jpg" },
      { src: "/image3.jpg" },
    ];
    const initialProfilePictureIndex = 0;
    const handleIndex = jest.fn();

    render(
      <AddOrEditProfile
        isProfileEditable={true}
        images={images}
        profilePicture={initialProfilePictureIndex}
        handleIndex={handleIndex}
      />,
    );

    // The initial profile image should be rendered
    const initialProfileImage = screen.getByAltText("profile Image");
    expect(initialProfileImage).toHaveAttribute(
      "src",
      images[initialProfilePictureIndex].src,
    );

    // Click the "Open Modal" button to open the AvatarModal
    const editButton = screen.getByRole("button", { name: "Open Modal" });
    fireEvent.click(editButton);

    // Click on the second image in the modal to change the profile image
    const image2 = screen.getByAltText("Avatar 2");
    fireEvent.click(image2);

    // The AvatarModal should be closed
    const modal = screen.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();

    // The profile image should be updated to the second image
    const updatedProfileImage = screen.getByAltText("profile Image");
    expect(updatedProfileImage).toHaveAttribute("src", images[1].src);

    // The handleIndex function should have been called with the correct index (1)
    expect(handleIndex).toHaveBeenCalledWith(1);
  });

  // Add more test cases for other functionalities as needed
});
