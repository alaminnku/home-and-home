import Image from "next/image";
import { HiPlus, HiMinus } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useCart } from "@contexts/CartContext";
import { useEffect, useState } from "react";
import styles from "@styles/item/Item.module.css";
import { convertNumber } from "@utils/index";

export default function Item({ item }) {
  const [itemInCart, setItemInCart] = useState();
  const { cartItems, addItemToCart, removeItemFromPage } = useCart();
  const [initialItem, setInitialItem] = useState({
    id: item.id,
    name: item.name,
    quantity: 1,
    unitPrice: parseFloat(item.price),
    totalPrice: parseFloat(item.price),
  });

  // Quantity and unit price
  const { quantity, unitPrice } = initialItem;

  // Update item in cart
  useEffect(() => {
    setItemInCart(cartItems.find((cartItem) => cartItem.id === item.id));
  }, [initialItem]);

  // Update quantity of initial item
  useEffect(() => {
    setInitialItem((prevItem) => ({
      ...prevItem,
      quantity: itemInCart?.quantity || 1,
      totalPrice: itemInCart?.totalPrice || prevItem.totalPrice,
    }));
  }, [itemInCart]);

  // Increase quantity
  function increaseQuantity() {
    setInitialItem((prevItem) => ({
      ...prevItem,
      quantity: prevItem.quantity + 1,
      totalPrice: parseFloat(prevItem.unitPrice * (prevItem.quantity + 1)),
    }));
  }

  // Decrease quantity
  function decreaseQuantity() {
    setInitialItem((prevItem) => ({
      ...prevItem,
      quantity: prevItem.quantity - 1,
      totalPrice: parseFloat(prevItem.unitPrice * (prevItem.quantity - 1)),
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
        </div>

        <div className={styles.controller}>
          <div
            className={`${styles.minus} ${styles.icon} ${
              quantity > 1 && styles.active
            }`}
            onClick={decreaseQuantity}
          >
            <HiMinus />
          </div>
          <p className={styles.quantity}>{quantity}</p>
          <div
            className={`${styles.plus} ${styles.icon}`}
            onClick={increaseQuantity}
          >
            <HiPlus />
          </div>
        </div>

        {itemInCart && (
          <div
            className={styles.remove_item}
            onClick={() => removeItemFromPage(item.id)}
          >
            <FaTrash />
            <p>Remove item</p>
          </div>
        )}
      </div>

      <div className={styles.button}>
        <button onClick={() => addItemToCart(initialItem)}>
          Add {quantity} to basket • {convertNumber(quantity * unitPrice)} LKR
        </button>
      </div>
    </section>
  );
}