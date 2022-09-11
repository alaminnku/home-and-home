import { BiCheck } from "react-icons/bi";
import styles from "@styles/placing-order/PlacingOrder.module.css";
import { useCart } from "@contexts/CartContext";

export default function PlacingOrder() {
  const { cartItems } = useCart();

  console.log(cartItems);

  return (
    <section className={styles.placing_order}>
      <div className={styles.placing_order_top}>
        <h1>Placing order...</h1>
        <p>Sp</p>
      </div>

      <div className={styles.items_top}>
        <BiCheck />
        <p>Your order, name</p>
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
