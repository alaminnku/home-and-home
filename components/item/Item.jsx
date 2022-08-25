import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useCart } from "@contexts/CartContext";
import { useEffect, useState } from "react";
import styles from "@styles/item/Item.module.css";

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
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

  // Update item in cart
  useEffect(() => {
    setItemInCart(cartItem);
  }, [initialItem]);

  // Update quantity of initial item
  useEffect(() => {
    setInitialItem((prevItem) => ({
      ...prevItem,
      quantity: cartItem?.quantity || 1,
      totalPrice: cartItem?.totalPrice || prevItem.totalPrice,
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

        {itemInCart && (
          <div
            className={styles.remove_item}
            onClick={() => removeItemFromPage(item.id)}
          >
            <RiDeleteBinLine />
            <p>Remove item</p>
          </div>
        )}
      </div>

      <div className={styles.button}>
        <button onClick={() => addItemToCart(initialItem)}>
          Add {quantity} to basket - {quantity * unitPrice} LKR
        </button>
      </div>
    </section>
  );
}
