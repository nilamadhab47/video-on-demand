import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "@/pages/signin";

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

describe("SignIn", () => {
  test("renders the title and Input boxes", () => {
    render(<SignIn />);

    // Test if the title "Sign In" is present
    const heading = screen.getByRole("heading", { name: "Sign In" });
    expect(heading).toBeInTheDocument();

    // Test if the email input box is present
    const emailInput = screen.getByPlaceholderText("Enter Email");
    expect(emailInput).toBeInTheDocument();

    // Test if the password input box is present
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    expect(passwordInput).toBeInTheDocument();
  });

  test("submit button is disabled initially", () => {
    render(<SignIn />);

    // Test if the submit button is initially disabled
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();
  });

  test("typing in input fields updates form data", () => {
    render(<SignIn />);

    // Test if typing in the email input updates the form data
    const emailInput = screen.getByPlaceholderText("Enter Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    // Test if typing in the password input updates the form data
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  test("clicking the submit button triggers form submission", async () => {
    render(<SignIn />);

    // Mock the API response using fetch or your preferred method
    // (assuming the API request is successful in this test case)
    const mockApiResponse = {
      data: {
        tokens: {
          access: {
            token: "mocked-access-token",
          },
        },
        user: {
          id: 1,
          name: "John Doe",
        },
      },
    };
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    // Test if the submit button is initially disabled
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();

    // Type in the email and password input fields
    const emailInput = screen.getByPlaceholderText("Enter Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const passwordInput = screen.getByPlaceholderText("Enter Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if the submit button is enabled after filling the form
    expect(submitButton).not.toBeDisabled();

    // Click the submit button to trigger form submission
    fireEvent.click(submitButton);

    // Ensure that the form submission logic is triggered, and the router.replace() is called
    expect(window.fetch).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      }),
    );

    // Ensure that the router.replace() function is called with the correct path
    expect(window.next.router.replace).toHaveBeenCalledWith("/home");

    // Additional tests can be done based on the response, but that depends on your implementation.
  });

  // Add more test cases for form validation, error messages, etc. as needed.
});
