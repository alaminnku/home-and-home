import { CartProvider } from "@contexts/CartContext";
import { UserProvider } from "@auth0/nextjs-auth0";
import { RecoilRoot } from "recoil";
import { SkeletonTheme } from "react-loading-skeleton";
import "@styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <SkeletonTheme
      baseColor="#eaeaea"
      highlightColor="#fafafa"
      borderRadius="0.5rem"
      duration={4}
    >
      <UserProvider>
        <RecoilRoot>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </RecoilRoot>
      </UserProvider>
    </SkeletonTheme>
  );
}
