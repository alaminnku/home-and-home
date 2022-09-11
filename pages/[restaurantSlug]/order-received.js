import OrderReceived from "@components/order-received";
import { requireLogin } from "@utils/index";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function OrderReceivedPage() {
  return (
    <main>
      <OrderReceived />
    </main>
  );
}

export default requireLogin
  ? withPageAuthRequired(OrderReceivedPage)
  : OrderReceivedPage;
