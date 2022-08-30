import { useEffect } from "react";
import { useRouter } from "next/router";
import Checkout from "@components/checkout";
import { requireLogin } from "@utils/index";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function CheckoutPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem("type");

    if (user) {
      if (user.type === "new" && !localStorage.getItem("type")) {
        localStorage.setItem("visited-url", JSON.stringify(router.asPath));

        router.push("/user-info");
      } else if (userType === "existing") {
        localStorage.removeItem("visited-url");
      }
    }
  }, [router, user]);

  return (
    <main>
      <Checkout />
    </main>
  );
}

export default requireLogin ? withPageAuthRequired(CheckoutPage) : CheckoutPage;
