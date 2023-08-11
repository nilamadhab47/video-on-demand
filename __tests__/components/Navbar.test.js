// Navbar.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Navbar from "@/components/Navbar";
const mockStore = configureMockStore();

describe("Navbar Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      profileData: {
        user: [{ username: "testUser", avatarIndex: 0 }],
      },
    });
  });

  test("renders Navbar with Home link", () => {
    render(
      <Provider store={store}>
        <Navbar type="home" />
      </Provider>,
    );

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test("displays search bar when search icon is clicked", () => {
    render(
      <Provider store={store}>
        <Navbar type="home" />
      </Provider>,
    );

    const searchIcon = screen.getByTestId("search-icon");
    fireEvent.click(searchIcon);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });

  test("displays mobile navbar when arrow down icon is clicked", () => {
    render(
      <Provider store={store}>
        <Navbar type="home" />
      </Provider>,
    );

    const arrowDownIcon = screen.getByTestId("arrow-down-icon");
    fireEvent.click(arrowDownIcon);

    const mobileNavbar = screen.getByTestId("mobile-navbar");
    expect(mobileNavbar).toBeInTheDocument();
  });

  test("redirects to /home when Home link is clicked", () => {
    render(
      <Provider store={store}>
        <Navbar type="home" />
      </Provider>,
    );

    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);

    // Add your expectation for redirection (mocking the router if needed)
  });

  test("displays user options when profile image is clicked", () => {
    render(
      <Provider store={store}>
        <Navbar type="home" />
      </Provider>,
    );

    const profileImage = screen.getByAltText("image");
    fireEvent.click(profileImage);

    const userOptions = screen.getByTestId("user-options");
    expect(userOptions).toBeInTheDocument();
  });
});

// You can add more test cases as needed to cover other scenarios and interactions in the Navbar component.
