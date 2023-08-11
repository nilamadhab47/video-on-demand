import { useEffect } from "react";
import { useRouter } from "next/router";

const privateRoutes = [
  "/home",
  "/kids",
  "/popular",
  "/browse",
  "/account",
  "/category",
  "/mylist",
  "/profile",
  "/movie",
  "/videoplayer",
];

const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const isPublicRoute = ["/signin", "/register", "/"].includes(
      router.pathname,
    );
    const isPrivateRoute = privateRoutes.includes(router.pathname);

    console.log("accessToken:", accessToken);
    console.log("router.pathname:", router.pathname);
    console.log("isPublicRoute:", isPublicRoute);
    console.log("isPrivateRoute:", isPrivateRoute);

    if (accessToken && isPublicRoute) {
      console.log("Redirecting to /home");
      router.push("/home");
    } else if (!accessToken && isPrivateRoute) {
      console.log("Redirecting to /signin");
      router.push("/signin");
    } else if (
      accessToken &&
      isPrivateRoute &&
      !privateRoutes.includes(router.pathname)
    ) {
      console.log("Redirecting to", privateRoutes[0]);
      router.push(privateRoutes[0]);
    }
  }, [router.pathname]);
};

export default useAuthGuard;
