import { CartProvider } from "@contexts/CartContext";
import { UserProvider } from "@auth0/nextjs-auth0";
import { RecoilRoot } from "recoil";
import "@styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <RecoilRoot>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </RecoilRoot>
    </UserProvider>
  );
}
