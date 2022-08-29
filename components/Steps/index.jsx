import styles from "@styles/steps/Steps.module.css";

export default function ({ active }) {
  return (
    <div className={styles.steps}>
      <div className={active >= 1 ? styles.active : ""} />
      <div className={active >= 2 ? styles.active : ""} />
      <div className={active >= 3 ? styles.active : ""} />
      <div className={active >= 4 ? styles.active : ""} />
    </div>
  );
}
