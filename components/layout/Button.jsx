import Link from "next/link";
import styles from "@styles/layout/Button.module.css";

export default function Button({ closeCart, text, background, url, disabled }) {
  return (
    <div
      className={styles.button}
      onClick={closeCart}
      style={{ "--background": background }}
    >
      <Link href={url}>
        <a className={disabled ? styles.disabled : null}>{text}</a>
      </Link>
    </div>
  );
}
