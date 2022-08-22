import Navigation from "@components/layout/Navigation";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Navigation />
    </>
  );
}

export default MyApp;
