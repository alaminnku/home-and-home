import { useEffect } from "react";
import { useCart } from "@contexts/CartContext";
import { useRouter } from "next/router";
import Swipeable from "./Swipeable";
import { convertNumber } from "@utils/index";
import styles from "@styles/layout/Cart.module.css";

export default function Cart() {
  const router = useRouter();
  const { isOpen, closeCart, cartItems, totalCartPrice } = useCart();

  // Restaurant name
  const { restaurantSlug } = router.query;
  const restaurantName = restaurantSlug.split("-").join(" ");

  // Disable body scroll when cart is open
  useEffect(() => {
    const body = document.querySelector("body");
    isOpen ? (body.style.overflow = "hidden") : (body.style.overflow = null);
  }, [isOpen]);

  function pushToTheCheckoutPage() {
    closeCart();
    router.push(`${restaurantSlug}/checkout`);
  }

  return (
    <div>
      <div
        className={`${styles.cart} ${
          cartItems.length > 0 && isOpen && styles.open
        }`}
      >
        <p className={styles.restaurant_name}>{restaurantName}</p>

        <Swipeable items={cartItems} />

        <div className={styles.subtotal}>
          <p>Subtotal</p>
          <p>LKR {convertNumber(totalCartPrice)}</p>
        </div>

        <div className={styles.checkout}>
          <button onClick={pushToTheCheckoutPage}>Go to checkout</button>
        </div>
      </div>

      <div
        onClick={closeCart}
        className={`${styles.Overlay} ${
          cartItems.length > 0 && isOpen && styles.Open
        }`}
      ></div>
    </div>
  );
}
