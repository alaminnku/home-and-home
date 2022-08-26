import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { convertNumber, createSlug } from "@utils/index";
import styles from "@styles/restaurant/Items.module.css";
import { useCart } from "@contexts/CartContext";

export default function Items({ restaurant }) {
  const router = useRouter();
  const { restaurantSlug } = router.query;
  const { isOpen, openCart, cartItems, totalCartQuantity } = useCart();

  // All appetizers
  const appetizers = restaurant.items.filter(
    (item) => item.type === "appetizers"
  );

  // All mains
  const mains = restaurant.items.filter((item) => item.type === "mains");

  // All dumplings
  const dumplings = restaurant.items.filter(
    (item) => item.type === "dumplings"
  );

  // Check if category exists
  const categoryExist = (category) => category.length > 0;

  return (
    <section className={styles.items}>
      {/* If there is a appetizers category */}
      {categoryExist(appetizers) && (
        <div className={styles.item}>
          <h2>Appetizers</h2>
          {appetizers.map((appetizer) => (
            <Link
              href={`${restaurantSlug}/${createSlug(appetizer.name)}`}
              key={appetizer.id}
            >
              <a className={styles.product}>
                <div className={styles.header}>
                  <p className={styles.title}>{appetizer.name}</p>
                  <p className={styles.price}>
                    LKR {convertNumber(appetizer.price)}
                  </p>
                  <p className={styles.description}>{appetizer.description}</p>
                </div>
                <div className={styles.image}>
                  <Image
                    src={appetizer.image}
                    width={1}
                    height={1}
                    layout="responsive"
                    objectFit="cover"
                  />

                  {cartItems.map(
                    (cartItem) =>
                      cartItem.id === appetizer.id && (
                        <p key={appetizer.id} className={styles.quantity}>
                          {cartItem.quantity}
                        </p>
                      )
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}

      {/* If there is a mains category */}
      {categoryExist(mains) && (
        <div className={styles.item}>
          <h2>Mains</h2>
          {mains.map((main) => (
            <Link
              href={`${restaurantSlug}/${createSlug(main.name)}`}
              key={main.id}
            >
              <a className={styles.product}>
                <div className={styles.header}>
                  <p className={styles.title}>{main.name}</p>
                  <p className={styles.price}>
                    LKR {convertNumber(main.price)}
                  </p>
                  <p className={styles.description}>{main.description}</p>
                </div>
                <div className={styles.image}>
                  <Image
                    src={main.image}
                    width={1}
                    height={1}
                    layout="responsive"
                    objectFit="cover"
                  />

                  {cartItems.map(
                    (cartItem) =>
                      cartItem.id === main.id && (
                        <p key={main.id} className={styles.quantity}>
                          {cartItem.quantity}
                        </p>
                      )
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}

      {/* If there is a dumplings category */}
      {categoryExist(dumplings) && (
        <div className={styles.item}>
          <h2>Dumplings</h2>
          {dumplings.map((dumpling) => (
            <Link
              href={`${restaurantSlug}/${createSlug(dumpling.name)}`}
              key={dumpling.id}
            >
              <a className={styles.product}>
                <div className={styles.header}>
                  <p className={styles.title}>{dumpling.name}</p>
                  <p className={styles.price}>
                    LKR {convertNumber(dumpling.price)}
                  </p>
                  <p className={styles.description}>{dumpling.description}</p>
                </div>
                <div className={styles.image}>
                  <Image
                    src={dumpling.image}
                    width={1}
                    height={1}
                    layout="responsive"
                    objectFit="cover"
                  />

                  {cartItems.map(
                    (cartItem) =>
                      cartItem.id === dumpling.id && (
                        <p key={dumpling.id} className={styles.quantity}>
                          {cartItem.quantity}
                        </p>
                      )
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}

      {cartItems.length > 0 && !isOpen && (
        <button className={styles.button} onClick={openCart}>
          View basket ({totalCartQuantity})
        </button>
      )}
    </section>
  );
}
