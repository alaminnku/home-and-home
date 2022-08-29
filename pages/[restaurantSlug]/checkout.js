import Checkout from "@components/checkout";
import { requireLogin } from "@utils/index";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function CheckoutPage() {
  return (
    <main>
      <Checkout />
    </main>
  );
}

export default requireLogin ? withPageAuthRequired(CheckoutPage) : CheckoutPage;
