// import { useEffect } from "react";
// import { useRouter } from "next/router";

// const privateRoutes = [
//   "/kids",
//   "/popular",
//   "/browse",
//   "/account",
//   "/category",
//   "/mylist",
// ];

// const AuthGuard = ({ children }) => {
//   const router = useRouter();

//   useEffect(() => {
//     const accessToken = localStorage.getItem("token");
//     const isPublicRoute = ["/signin", "/register", "/"].includes(
//       router.pathname,
//     );
//     const isPrivateRoute = privateRoutes.includes(router.pathname);

//     if (!accessToken && !isPublicRoute) {
//       router.push("/signin");
//     } else if (accessToken && (isPublicRoute || isPrivateRoute)) {
//       router.replace("/home");
//     }
//   }, [router.pathname]);

//   return <>{children}</>;
// };

// export default function withAuthGuard(Component) {
//   const WrappedComponent = (props) => {
//     return (
//       <AuthGuard>
//         <Component {...props} />
//       </AuthGuard>
//     );
//   };
//   return WrappedComponent;
// }
