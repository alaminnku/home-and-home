import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import { convertNumber, createSlug } from "@utils/index";
import { useCart } from "@contexts/CartContext";
import styles from "@styles/restaurant/Items.module.css";

export default function Items({ restaurant, isLoading }) {
  const router = useRouter();
  const { restaurantSlug } = router.query;
  const { isOpen, openCart, cartItems, totalCartQuantity } = useCart();

  return (
    <section className={styles.categories}>
      {restaurant.categories.map((category) => (
        <div className={styles.category} key={category.id}>
          {isLoading ? (
            <Skeleton width={122} height={36} />
          ) : (
            <h2>{category.name}</h2>
          )}
          {category.items.map((item) => (
            <Link
              key={item.id}
              href={`${restaurantSlug}/${createSlug(item.name)}`}
            >
              <a className={styles.item}>
                <div className={styles.header}>
                  {isLoading ? (
                    <Skeleton width={170} height={27} />
                  ) : (
                    <p className={styles.title}>{item.name}</p>
                  )}

                  {isLoading ? (
                    <Skeleton width={74} height={24} />
                  ) : (
                    <p className={styles.price}>
                      LKR {convertNumber(item.price)}
                    </p>
                  )}

                  {isLoading ? (
                    <Skeleton width={288} height={71} />
                  ) : (
                    <p className={styles.description}>{item.description}</p>
                  )}
                </div>
                <div className={styles.image}>
                  {isLoading ? (
                    <Skeleton width={96} height={96} />
                  ) : (
                    <Image
                      src={item.image}
                      width={1}
                      height={1}
                      layout="responsive"
                      objectFit="cover"
                    />
                  )}

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
