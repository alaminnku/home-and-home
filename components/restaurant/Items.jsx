import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { createSlug } from "@utils/index";
import styles from "@styles/restaurant/Items.module.css";

export default function Items({ restaurant }) {
  const slug = useRouter().asPath;

  const appetizers = restaurant.items.filter(
    (item) => item.type === "appetizers"
  );

  const mains = restaurant.items.filter((item) => item.type === "mains");

  const dumplings = restaurant.items.filter(
    (item) => item.type === "dumplings"
  );

  // const description = (description) => {
  //   if (description.length > 15) {
  //     return description.split("").slice(0, 60).join("");
  //   }
  // };

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
                <p className={styles.title}>{appetizer.name}</p>
                <p className={styles.description}>{appetizer.description}</p>
                <p className={styles.price}>LKR {appetizer.price}</p>
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
                <p className={styles.title}>{main.name}</p>
                <p className={styles.description}>{main.description}</p>
                <p className={styles.price}>LKR {main.price}</p>
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
                <p className={styles.title}>{dumpling.name}</p>
                <p className={styles.description}>{dumpling.description}</p>
                <p className={styles.price}>LKR {dumpling.price}</p>
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
