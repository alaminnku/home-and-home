import Checkout from "@components/checkout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

// Require login
const requireLogin = false;

function CheckoutPage() {
  return (
    <main>
      <Checkout />
    </main>
  );
}

export default requireLogin ? withPageAuthRequired(CheckoutPage) : CheckoutPage;
