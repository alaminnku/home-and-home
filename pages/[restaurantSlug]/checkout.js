import Checkout from "@components/checkout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function CheckoutPage() {
  return (
    <main>
      <Checkout />
    </main>
  );
}

export default withPageAuthRequired(CheckoutPage);
