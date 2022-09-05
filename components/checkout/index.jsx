import { useCart } from "@contexts/CartContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import Swipeable from "@components/layout/Swipeable";
import { convertNumber } from "@utils/index";
import styles from "@styles/checkout/Checkout.module.css";

export default function Checkout() {
  const router = useRouter();
  const { cartItems, totalCartPrice } = useCart();
  const { restaurantSlug } = router.query;

  return (
    <section className={styles.checkout}>
      <div className={styles.checkout_top}>
        <h1>Checkout</h1>
        <div className={styles.items_top}>
          <p>Your items</p>
          <Link href={`/${restaurantSlug}`}>
            <a>See menu</a>
          </Link>
        </div>

        <Swipeable items={cartItems} />

        <div className={styles.add_items}>
          <Link href={`/${restaurantSlug}`}>
            <a>
              <HiPlus /> Add items
            </a>
          </Link>
        </div>

        <div className={styles.price}>
          <div className={styles.subtotal}>
            <p>Subtotal</p>
            <p>LKR {convertNumber(totalCartPrice)}</p>
          </div>
          <div className={styles.total}>
            <p>Total</p>
            <p>LKR {convertNumber(totalCartPrice)}</p>
          </div>
        </div>

        <p className={styles.info}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque beatae
          nam voluptatum delectus accusantium. Quo.
        </p>
      </div>

      <div className={styles.order}>
        <Link href="/">
          <a
            className={cartItems.length > 0 ? styles.active : null}
          >{`Place order • LKR ${convertNumber(totalCartPrice)}`}</a>
        </Link>
      </div>
    </section>
  );
}