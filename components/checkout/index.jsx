import { useCart } from "@contexts/CartContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import Swipeable from "@components/layout/Swipeable";
import { convertNumber } from "@utils/index";
import styles from "@styles/checkout/Checkout.module.css";
import axios from "axios";
import { useOrder } from "@contexts/OrderContext";

export default function Checkout() {
  const router = useRouter();
  const { restaurantSlug } = router.query;
  const { setPlacingOrder, setOrderAttributes } = useOrder();
  const { cartItems, totalCartPrice } = useCart();

  function handlePlaceOrder() {
    setPlacingOrder(true);
    router.push(`/${restaurantSlug}/placing-order`);

    setTimeout(async () => {
      const order = {
        data: {
          order: {
            orderedItems: cartItems,
            total: totalCartPrice,
          },
        },
      };

      try {
        const res = await axios.post(
          "https://az-func-testing.azurewebsites.net/api/order",
          JSON.stringify(order)
        );

        setOrderAttributes(res.data.data.attributes);

        setPlacingOrder(false);

        router.push(`/${restaurantSlug}/order-received`);
      } catch (err) {
        console.log(err);
      }
    }, 2000);
  }

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

      <div className={styles.button}>
        <button
          onClick={handlePlaceOrder}
          className={cartItems.length > 0 ? styles.active : null}
        >{`Place order • LKR ${convertNumber(totalCartPrice)}`}</button>
      </div>
    </section>
  );
}
