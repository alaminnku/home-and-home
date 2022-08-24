import Image from "next/image";
import styles from "@styles/restaurant/Hero.module.css";

export default function Hero({ restaurant }) {
  const { name, address, banner } = restaurant;
  return (
    <section>
      <div className={styles.banner}>
        <Image
          src={banner}
          width={16}
          height={7}
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className={styles.header}>
        <h1>{name}</h1>
        <p>{address}</p>
      </div>
    </section>
  );
}
