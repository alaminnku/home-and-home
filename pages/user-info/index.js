import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa";
import Steps from "@components/Steps";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function UserInfo() {
  // router
  const router = useRouter();

  return (
    <div className={styles.user_info}>
      <Steps active={1} />
      <div className={styles.start}>
        <div className={styles.content}>
          <h6>Welcome!</h6>
          <p>We haven&apos;t met yet</p>
          <span>Please tap the button to get started</span>
        </div>

        <span
          className={styles.next}
          onClick={() => router.push("/user-info/firstname")}
        >
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
}
