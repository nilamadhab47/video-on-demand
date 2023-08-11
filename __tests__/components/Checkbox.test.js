import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional expect matchers
import Checkbox from "@/components/Checkbox";

describe("Checkbox Component", () => {
  test("renders the checkbox with label correctly", () => {
    const { getByLabelText, getByText } = render(
      <Checkbox
        id="my-checkbox"
        checkboxStyle={{ background: "red" }}
        checkboxLabel="Check me"
        checkboxlabelStyle={{ color: "blue" }}
        value="my-value"
        handleChange={() => {}}
      />,
    );

    const checkboxInput = getByLabelText("Check me");
    const checkboxLabel = getByText("Check me");

    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
    expect(checkboxInput).toHaveAttribute("type", "checkbox");
    expect(checkboxInput).not.toBeChecked();
  });

  test("calls handleChange when the checkbox is clicked", () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(
      <Checkbox
        id="my-checkbox"
        checkboxStyle={{ background: "red" }}
        checkboxLabel="Check me"
        checkboxlabelStyle={{ color: "blue" }}
        value="my-value"
        handleChange={handleChange}
      />,
    );

    const checkboxInput = getByLabelText("Check me");

    fireEvent.click(checkboxInput);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
