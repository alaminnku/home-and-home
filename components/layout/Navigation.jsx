import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import styles from "@styles/layout/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link href="/">
        <a>
          <HiHome />
        </a>
      </Link>
      <Link href="/">
        <a>
          <IoMdCart />
        </a>
      </Link>
    </nav>
  );
}
