import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlertModal from "@/components/AlertModal";

describe("AlertModal", () => {
  test("renders without errors", () => {
    const ref = React.createRef();
    render(<AlertModal ref={ref} />);
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  test("opens the modal and displays the provided text", () => {
    const ref = React.createRef();
    const displayText = "This is a test alert";
    render(<AlertModal ref={ref} />);

    // Call the openModal function with the displayText
    ref.current.openModal(displayText);

    // Modal should be visible with the provided text
    expect(screen.getByText(displayText)).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  test("closes the modal when the Close button is clicked", () => {
    const ref = React.createRef();
    const displayText = "This is a test alert";
    render(<AlertModal ref={ref} />);

    // Open the modal
    ref.current.openModal(displayText);
    expect(screen.getByText(displayText)).toBeInTheDocument();

    // Click the Close button
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Modal should be closed and text should not be visible
    expect(screen.queryByText(displayText)).not.toBeInTheDocument();
  });

  test("modal remains closed initially", () => {
    const ref = React.createRef();
    render(<AlertModal ref={ref} />);

    // Modal should not be visible initially
    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });
});
