import { CartProvider } from "@contexts/CartContext";
import { OrderProvider } from "@contexts/OrderContext";
import { UserProvider } from "@auth0/nextjs-auth0";
import { RecoilRoot } from "recoil";
import { SkeletonTheme } from "react-loading-skeleton";
import { ExistingUserProvider } from "@contexts/ExistingUserContext";
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
        <ExistingUserProvider>
          <OrderProvider>
            <RecoilRoot>
              <CartProvider>
                <Component {...pageProps} />
              </CartProvider>
            </RecoilRoot>
          </OrderProvider>
        </ExistingUserProvider>
      </UserProvider>
    </SkeletonTheme>
  );
}
