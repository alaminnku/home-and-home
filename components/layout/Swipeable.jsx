import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { convertNumber, createSlug } from "@utils/index";
import { useCart } from "@contexts/CartContext";
import styles from "@styles/layout/Swipeable.module.css";

export default function Swipeable({ items }) {
  const router = useRouter();
  const [swipedItems, setSwipedItems] = useState([]);
  const [verticalStart, setVerticalStart] = useState(0);
  const [horizontalStart, setHorizontalStart] = useState(0);
  const { isOpen, closeCart, removeItemFromCart } = useCart();

  // Restaurant name
  const { restaurantSlug } = router.query;

  // Remove swiped class from swiped items
  useEffect(() => {
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
    <div className={styles.items}>
      {items.map((item) => (
        <div key={item.id} className={styles.item_and_action}>
          <div
            id={item.id}
            className={`${styles.item}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.quantity_and_name}>
              <p className={styles.quantity}>{item.quantity}</p>
              <p
                className={styles.name}
                onClick={() => pushToTheItemPage(item.name)}
              >
                {item.name}
              </p>
            </div>

            <p className={styles.price}>
              LKR {convertNumber(item.unitPrice * item.quantity)}
            </p>
          </div>

          <p
            onClick={() => removeItemFromCart(item.id)}
            className={styles.action}
          >
            Remove
          </p>
        </div>
      ))}
    </div>
  );
}
