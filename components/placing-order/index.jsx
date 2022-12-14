import { useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { useCart } from "@contexts/CartContext";
import { useOrder } from "@contexts/OrderContext";
import { useRouter } from "next/router";
import MoonLoader from "react-spinners/MoonLoader";
import styles from "@styles/placing-order/PlacingOrder.module.css";
import { useExistingUser } from "@contexts/ExistingUserContext";

export default function PlacingOrder() {
  const router = useRouter();
  const { restaurantSlug } = router.query;
  const { cartItems } = useCart();
  const { existingUser } = useExistingUser();
  const { placingOrder } = useOrder();

  // If placing order is false
  // then push to the restaurant page
  useEffect(() => {
    if (!placingOrder && restaurantSlug) {
      router.push(`/${restaurantSlug}`);
    }
  }, [router]);

  return (
    <section className={styles.placing_order}>
      <div className={styles.placing_order_top}>
        <h1>Placing order...</h1>
        <MoonLoader color="#36d7b7" size={20} loading={placingOrder} />
      </div>

      <div className={styles.items_top}>
        <BiCheck />
        <p>Your order, {existingUser?.first_name}</p>
      </div>

      <div className={styles.items}>
        {cartItems.map((cartItem) => (
          <div key={cartItem.id} className={styles.item}>
            <p className={styles.quantity}>{cartItem.quantity}</p>
            <p>{cartItem.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
