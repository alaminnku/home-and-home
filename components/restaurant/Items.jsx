import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { convertNumber, createSlug } from "@utils/index";
import styles from "@styles/restaurant/Items.module.css";
import { useCart } from "@contexts/CartContext";

import { data } from "@data/restaurants";

export default function Items({ restaurant }) {
  const router = useRouter();
  const { restaurantSlug } = router.query;
  const { isOpen, openCart, cartItems, totalCartQuantity } = useCart();

  return (
    <section className={styles.categories}>
      {restaurant.categories.map((category) => (
        <div className={styles.category} key={category.id}>
          <h2>{category.name}</h2>
          {category.items.map((item) => (
            <Link
              key={item.id}
              href={`${restaurantSlug}/${createSlug(item.name)}`}
            >
              <a className={styles.item}>
                <div className={styles.header}>
                  <p className={styles.title}>{item.name}</p>
                  <p className={styles.price}>
                    LKR {convertNumber(item.price)}
                  </p>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.image}>
                  <Image
                    src={item.image}
                    width={1}
                    height={1}
                    layout="responsive"
                    objectFit="cover"
                  />

                  {cartItems.map(
                    (cartItem) =>
                      cartItem.id === item.id && (
                        <p key={item.id} className={styles.quantity}>
                          {cartItem.quantity}
                        </p>
                      )
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      ))}

      {cartItems.length > 0 && !isOpen && (
        <button className={styles.button} onClick={openCart}>
          View basket ({totalCartQuantity})
        </button>
      )}
    </section>
  );
}
