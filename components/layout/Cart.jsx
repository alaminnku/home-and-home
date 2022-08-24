import { useEffect, useRef, useState } from "react";
import styles from "@styles/layout/Cart.module.css";
import { useCart } from "@contexts/CartContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Cart() {
  const router = useRouter();
  const { isOpen, closeCart, cartItems, removeItemFromCart, totalCartPrice } =
    useCart();
  const [swipedItems, setSwipedItems] = useState([]);
  const [verticalStart, setVerticalStart] = useState(0);
  const [horizontalStart, setHorizontalStart] = useState(0);

  useEffect(() => {
    const body = document.querySelector("body");

    isOpen ? (body.style.overflow = "hidden") : (body.style.overflow = null);
  });

  // Restaurant name
  const restaurantName = router.query.restaurantSlug.split("-").join(" ");

  // Handle touch start
  function handleTouchStart(e) {
    // Get vertical and horizontal start
    setVerticalStart(e.targetTouches[0].pageY);
    setHorizontalStart(e.targetTouches[0].pageX);

    // Get the target
    const target =
      e.target.localName === "p" ? e.target.parentElement : e.target;

    // Update swiped items
    setSwipedItems((prevItems) => {
      if (!prevItems.some((prevItem) => prevItem.id == target.id)) {
        return [
          ...prevItems,
          {
            id: target.id,
            element: target,
          },
        ];
      } else {
        return prevItems;
      }
    });
  }

  // Handle touch end
  function handleTouchEnd(e) {
    // Get vertical and horizontal end
    const verticalEnd = e.changedTouches[0].pageY;
    const horizontalEnd = e.changedTouches[0].pageX;

    // Calculate the differences
    const verticalDifference = Math.abs(verticalStart - verticalEnd);
    const horizontalDifference = horizontalStart - horizontalEnd;

    // Get the target
    const target =
      e.target.localName === "p" ? e.target.parentElement : e.target;

    // Add swiped class to the swiped item
    // Remove swiped class from previously swiped items
    if (horizontalDifference > 60 && verticalDifference < 60) {
      swipedItems.forEach((swipedItem) => {
        if (swipedItem.id == target.id) {
          swipedItem.element.classList.add(`${styles.swiped}`);
        } else {
          swipedItem.element.classList.remove(`${styles.swiped}`);
        }
      });
    }
  }

  return (
    <div>
      <div className={`${styles.cart} ${isOpen && styles.open}`}>
        <p className={styles.restaurant_name}>{restaurantName}</p>
        <div className={styles.items_and_subtotal}>
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} className={styles.item_and_action}>
              <div
                id={cartItem.id}
                className={`${styles.item}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className={styles.quantity_and_name}>
                  <p className={styles.quantity}>{cartItem.quantity}</p>
                  <Link href="/">
                    <a className={styles.name}>{cartItem.name}</a>
                  </Link>
                </div>

                <p className={styles.price}>
                  LKR {cartItem.unitPrice * cartItem.quantity}
                </p>
              </div>

              <p
                onClick={() => removeItemFromCart(cartItem.id)}
                className={styles.action}
              >
                Remove
              </p>
            </div>
          ))}

          <div className={styles.subtotal}>
            <p>Subtotal</p>
            <p>LKR {totalCartPrice}</p>
          </div>
        </div>

        <div className={styles.button}>
          <button>Go to checkout</button>
        </div>
      </div>

      <div
        onClick={closeCart}
        className={`${styles.Overlay} ${isOpen && styles.Open}`}
      ></div>
    </div>
  );
}
