import { useRouter } from "next/router";
import { ImArrowRight } from "react-icons/im";
import Steps from "@components/Steps";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function UserInfo() {
  // router
  const router = useRouter();

  return (
    <div className={styles.user_info}>
      <Steps active={1} />
      <div className={styles.wrap}>
        <h6>Welcome!</h6>
        <p>We haven&apos;t met yet</p>
        <div onClick={() => router.push("/user-info/firstname")}>
          <span>Please tap to get started</span>
          <ImArrowRight />
        </div>
      </div>
    </div>
  );
}
