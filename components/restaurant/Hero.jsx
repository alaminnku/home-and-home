import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@styles/restaurant/Hero.module.css";

export default function Hero({ restaurant, isLoading }) {
  const { name, address, banner } = restaurant;

  return (
    <section>
      <div className={styles.banner}>
        {isLoading ? (
          <Skeleton height={186} width={424} />
        ) : (
          <Image
            src={banner}
            width={16}
            height={7}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
          />
        )}
      </div>

      <div className={styles.header}>
        {isLoading ? <Skeleton height={60} width={330} /> : <h1>{name}</h1>}

        {isLoading ? null : <p>{address}</p>}
      </div>
    </section>
  );
}
