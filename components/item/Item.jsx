import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useCart } from "@contexts/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@styles/item/Item.module.css";

export default function Item({ item }) {
  const router = useRouter();
  const { cartItems, addItemToCart } = useCart();
  const [initialItem, setInitialItem] = useState({
    id: item.id,
    name: item.name,
    quantity: 1,
    unitPrice: item.price,
  });

  // Quantity and unit price
  const { quantity, unitPrice } = initialItem;

  // Get the quantity of the item from cart
  const itemQuantityInCart = cartItems.find(
    (cartItem) => cartItem.id === item.id
  )?.quantity;

  // Update the initial item
  useEffect(() => {
    // Restaurant slug
    const restaurantSlug = router.query.restaurantSlug;

    setInitialItem((prevItem) => ({
      ...prevItem,
      restaurantSlug,
      quantity: itemQuantityInCart || 1,
    }));
  }, [cartItems]);

  // Increase quantity
  function increaseQuantity() {
    setInitialItem((prevItem) => ({
      ...prevItem,
      quantity: prevItem.quantity + 1,
    }));
  }

  // Decrease quantity
  function decreaseQuantity() {
    setInitialItem((prevItem) => ({
      ...prevItem,
      quantity: prevItem.quantity - 1,
    }));
  }
  return (
    <section className={styles.item}>
      <div className={styles.item_top}>
        <div className={styles.banner}>
          <Image
            src={item.image}
            width={16}
            height={10}
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.description}>{item.description}</p>
          <p className={styles.price}>LKR {item.price}</p>
        </div>

        <div className={styles.controller}>
          <div
            className={`${styles.minus} ${styles.icon} ${
              quantity > 1 && styles.active
            }`}
            onClick={decreaseQuantity}
          >
            <AiOutlineMinus />
          </div>
          <p className={styles.quantity}>{quantity}</p>
          <div
            className={`${styles.plus} ${styles.icon}`}
            onClick={increaseQuantity}
          >
            <AiOutlinePlus />
          </div>
        </div>
      </div>

      <div className={styles.button}>
        <button onClick={() => addItemToCart(initialItem)}>
          Add {quantity} to basket - {quantity * unitPrice} LKR
        </button>
      </div>
    </section>
  );
}
