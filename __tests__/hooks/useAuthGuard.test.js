import useAuthGuard from "@/hooks/useAuthGuard";
import { render } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock("next/router");

const TestComponent = () => {
  useAuthGuard(); // Simulate the use of useAuthGuard in a component

  return <div>Test Component</div>;
};

describe("TestComponent", () => {
  it("redirects to the first private route when accessToken exists but on an unknown private route", () => {
    // Mock the localStorage.getItem to return a truthy value (access token exists)
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValueOnce("someAccessToken");

    // Mock the useRouter
    const pushMock = jest.fn();
    const routerMock = {
      pathname: "/unknownPrivateRoute",
      push: pushMock,
    };

    // Set up jsdom to provide a window object
    const { window } = new (require("jsdom").JSDOM)("");
    global.window = window;

    useRouter.mockReturnValueOnce(routerMock);

    // Render the TestComponent
    render(<TestComponent />);

    // Assert the redirection
    expect(pushMock).toHaveBeenCalledWith(privateRoutes[0]);
  });
});
