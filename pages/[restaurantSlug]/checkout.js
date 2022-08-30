import { useEffect } from "react";
import { useRouter } from "next/router";
import Checkout from "@components/checkout";
import { requireLogin, checkUserType } from "@utils/index";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function CheckoutPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    checkUserType(router, user);
  }, [router, user]);

  return (
    <main>
      <Checkout />
    </main>
  );
}

export default requireLogin ? withPageAuthRequired(CheckoutPage) : CheckoutPage;
