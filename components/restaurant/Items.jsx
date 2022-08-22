import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { createSlug } from "@utils/index";
import styles from "@styles/restaurant/Items.module.css";

export default function Items({ restaurant }) {
  const slug = useRouter().asPath;
  const { appetizers, mains, dumplings } = restaurant.items;

  return (
    <section className={styles.items}>
      <div className={styles.item}>
        <h2>Appetizers</h2>
        {appetizers.map((appetizer) => (
          <Link
            href={`${slug}/${createSlug(appetizer.name)}`}
            key={Math.random() * 100000}
          >
            <a className={styles.product}>
              <div className={styles.header}>
                <p>{appetizer.name}</p>
                <p>LKR {appetizer.price}</p>
              </div>
              <div className={styles.image}>
                <Image
                  src={appetizer.image}
                  width={1}
                  height={1}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            </a>
          </Link>
        ))}
      </div>

      <div className={styles.item}>
        <h2>Mains</h2>
        {mains.map((main) => (
          <Link
            href={`${slug}/${createSlug(main.name)}`}
            key={Math.random() * 100000}
          >
            <a className={styles.product}>
              <div className={styles.header}>
                <p>{main.name}</p>
                <p>LKR {main.price}</p>
              </div>
              <div className={styles.image}>
                <Image
                  src={main.image}
                  width={1}
                  height={1}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            </a>
          </Link>
        ))}
      </div>

      <div className={styles.item}>
        <h2>Dumplings</h2>
        {dumplings.map((dumpling) => (
          <Link
            href={`${slug}/${createSlug(dumpling.name)}`}
            key={Math.random() * 100000}
          >
            <a className={styles.product}>
              <div className={styles.header}>
                <p>{dumpling.name}</p>
                <p>LKR {dumpling.price}</p>
              </div>
              <div className={styles.image}>
                <Image
                  src={dumpling.image}
                  width={1}
                  height={1}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
