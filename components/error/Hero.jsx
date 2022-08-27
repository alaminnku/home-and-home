import styles from "@styles/error/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p>Sorry! No restaurant available by that name</p>
    </section>
  );
}
