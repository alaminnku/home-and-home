import { useEffect, useState } from "react";
import styles from "@styles/layout/Cart.module.css";
import { useCart } from "@contexts/CartContext";
import { useRouter } from "next/router";
import { createSlug } from "@utils/index";

export default function Cart() {
  const router = useRouter();
  const { isOpen, closeCart, cartItems, removeItemFromCart, totalCartPrice } =
    useCart();
  const [swipedItems, setSwipedItems] = useState([]);
  const [verticalStart, setVerticalStart] = useState(0);
  const [horizontalStart, setHorizontalStart] = useState(0);

  // Restaurant name
  const { restaurantSlug } = router.query;
  const restaurantName = restaurantSlug.split("-").join(" ");

  // When cart is open
  useEffect(() => {
    // Disable body scroll
    const body = document.querySelector("body");
    isOpen ? (body.style.overflow = "hidden") : (body.style.overflow = null);

    // Remove swiped class from swiped items
    swipedItems.forEach((swipedItem) => {
      swipedItem.element.classList.remove(`${styles.swiped}`);
    });
  }, [isOpen]);

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

    // Target and swipe threshold
    const threshold = 50;
    const target =
      e.target.localName === "p"
        ? e.target.parentElement.parentElement
        : e.target;

    // Swiped left
    const leftSwipe =
      horizontalDifference > threshold && verticalDifference < threshold;

    // Swiped right
    const rightSwipe =
      horizontalDifference < -threshold && verticalDifference < threshold;

    // When swiped left, add swiped class to the swiped item
    // Remove swiped class from previously swiped items
    if (leftSwipe) {
      swipedItems.forEach((swipedItem) => {
        if (swipedItem.id == target.id) {
          swipedItem.element.classList.add(`${styles.swiped}`);
        } else {
          swipedItem.element.classList.remove(`${styles.swiped}`);
        }
      });
    }

    // When swiped right, remove swiped class from the item
    if (rightSwipe) {
      swipedItems.forEach((swipedItem) => {
        if (swipedItem.id == target.id) {
          swipedItem.element.classList.remove(`${styles.swiped}`);
        }
      });
    }
  }

  // Push to the item page
  function pushToTheItemPage(name) {
    closeCart();
    router.push(`/${restaurantSlug}/${createSlug(name)}`);
  }

  return (
    <div>
      <div
        className={`${styles.cart} ${
          cartItems.length > 0 && isOpen && styles.open
        }`}
      >
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
                  <p
                    className={styles.name}
                    onClick={() => pushToTheItemPage(cartItem.name)}
                  >
                    {cartItem.name}
                  </p>
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
        className={`${styles.Overlay} ${
          cartItems.length > 0 && isOpen && styles.Open
        }`}
      ></div>
    </div>
  );
}
