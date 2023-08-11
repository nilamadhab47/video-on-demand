// import { wrapper } from "@/store/store";
// import "@/styles/globals.css";
// import { Provider } from "react-redux";
// import ModalProvider from "@/components/ModalProvider";
// import AuthGuard from "@/components/AuthGuard";

// export default function MyApp({ Component, ...rest }) {
//   const { store, props } = wrapper.useWrappedStore(rest);
//   const { pageProps } = props;
//   const AuthenticatedComponent = Component.auth
//     ? () => (
//         <AuthGuard>
//           <Component {...pageProps} />
//         </AuthGuard>
//       )
//     : Component;
//   return (
//     <Provider store={store}>
//       <AuthenticatedComponent {...pageProps} />
//       <ModalProvider />
//     </Provider>
//   );
// }

import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import ModalProvider from "@/components/ModalProvider";
import withAuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuthGuard from "@/hooks/useAuthGuard";
export default function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  // const AuthenticatedComponent = Component.auth
  //   ? withAuthGuard(Component)
  //   : Component;

  useAuthGuard();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ModalProvider />
    </Provider>
  );
}
