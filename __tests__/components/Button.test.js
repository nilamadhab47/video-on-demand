import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/Button";

describe("Button", () => {
  test("renders a default button with provided text", () => {
    const handleClickMock = jest.fn();
    render(<Button text="Click Me" handleClick={handleClickMock} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click Me");
    expect(buttonElement).not.toBeDisabled();

    fireEvent.click(buttonElement);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders a "submit" button with provided text and correct styles', () => {
    const handleClickMock = jest.fn();
    render(
      <Button
        text="Submit"
        handleClick={handleClickMock}
        type="submit"
        btnStyle="test-style"
      />,
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Submit");
    expect(buttonElement).toHaveClass("test-style");
    expect(buttonElement).not.toBeDisabled();

    fireEvent.click(buttonElement);
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders a "Watch Now" button with play icon and provided styles', () => {
    const handleClickMock = jest.fn();
    render(
      <Button
        text="Watch Now"
        handleClick={handleClickMock}
        btnStyle="test-style"
      />,
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Watch Now");
    expect(buttonElement).toHaveClass("test-style");
  });

  test('renders a "Watch Later" button with or without a tick icon based on showTick prop', () => {
    const handleClickMock = jest.fn();
    render(
      <Button
        text="Watch Later"
        handleClick={handleClickMock}
        btnStyle="test-style"
        showTick={false}
      />,
    );
    expect(screen.queryByText("Added")).not.toBeInTheDocument();

    render(
      <Button
        text="Watch Later"
        handleClick={handleClickMock}
        btnStyle="test-style"
        showTick={true}
      />,
    );
    expect(screen.getByText("Added")).toBeInTheDocument();
  });

  test("calls handleClick when the button is clicked", () => {
    const handleClickMock = jest.fn();
    render(<Button text="Click Me" handleClick={handleClickMock} />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});
