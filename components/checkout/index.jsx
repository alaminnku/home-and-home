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
  const { cartItems, setCartItems, totalCartPrice } = useCart();

  // Handle place order
  function handlePlaceOrder() {
    // Start the loader and push to placing order page
    setPlacingOrder(true);
    router.push(`/${restaurantSlug}/placing-order`);

    // After 2 seconds run these codes
    setTimeout(async () => {
      // Create the order
      const order = {
        data: {
          order: {
            orderedItems: cartItems,
            total: totalCartPrice,
          },
        },
      };

      try {
        // Post the data to API
        const res = await axios.post(
          "https://az-func-testing.azurewebsites.net/api/order",
          JSON.stringify(order)
        );

        // Update order attributes state
        setOrderAttributes(res.data.data.attributes);

        // Push to the order received page
        router.push(`/${restaurantSlug}/order-received`);

        // Stop the loader
        setPlacingOrder(false);

        // Remove cart items from local storage
        localStorage.removeItem(`${restaurantSlug}-cart`);

        // Set cart items to an empty array
        setCartItems([]);
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
