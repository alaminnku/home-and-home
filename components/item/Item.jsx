import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import styles from "@styles/item/Item.module.css";

export default function Item({ item }) {
  return (
    <section className={styles.item}>
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
        <div className={`${styles.minus} ${styles.icon}`}>
          <AiOutlineMinus />
        </div>
        <p className={styles.quantity}>1</p>
        <div className={`${styles.plus} ${styles.icon}`}>
          <AiOutlinePlus />
        </div>
      </div>

      <div className={styles.button}>
        <button>Add 1 to basket - {item.price} LKR</button>
      </div>
    </section>
  );
}
