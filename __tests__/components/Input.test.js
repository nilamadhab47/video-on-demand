import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";
import "@testing-library/jest-dom";

test("renders Input component with provided props", () => {
  const placeholderText = "Enter your name";
  const inputValue = "John Doe";
  const handleChange = jest.fn();
  const { container } = render(
    <Input
      type="text"
      placeholder={placeholderText}
      value={inputValue}
      handleChange={handleChange}
      inputStyles="custom-input-style"
    />,
  );

  const inputElement = screen.getByPlaceholderText(placeholderText);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toBe(inputValue);
  expect(container.querySelector(".custom-input-style")).toBeInTheDocument();
});

test("toggles password visibility on button click", () => {
  const { container } = render(
    <Input
      type="password"
      placeholder="Enter your password"
      value="secretpassword"
      handleChange={() => {}}
      hideShowStyle="custom-hide-btn"
    />,
  );

  const passwordInput = screen.getByPlaceholderText("Enter your password");
  const toggleButton = container.querySelector(".custom-hide-btn");

  // Password is initially hidden
  expect(passwordInput.type).toBe("password");

  // Click toggle button
  fireEvent.click(toggleButton);

  // Password should be visible
  expect(passwordInput.type).toBe("text");

  // Click toggle button again
  fireEvent.click(toggleButton);

  // Password should be hidden again
  expect(passwordInput.type).toBe("password");
});

test("displays error message if provided", () => {
  const errorMsg = "Invalid input";
  const { container } = render(
    <Input
      type="text"
      placeholder="Enter your name"
      value=""
      handleChange={() => {}}
      errorMsg={errorMsg}
    />,
  );

  const errorMessage = screen.getByText(errorMsg);
  expect(errorMessage).toBeInTheDocument();
});
