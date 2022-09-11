import PlacingOrder from "@components/placing-order";
import { requireLogin } from "@utils/index";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function PlacingOrderPage() {
  return (
    <main>
      <PlacingOrder />
    </main>
  );
}

export default requireLogin
  ? withPageAuthRequired(PlacingOrderPage)
  : PlacingOrderPage;
