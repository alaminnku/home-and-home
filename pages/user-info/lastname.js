import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Steps from "@components/Steps";
import { lastNameAtom } from "@atoms/userinfo";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function Lastname() {
  // router
  const router = useRouter();

  // states
  const [lastName, setLastName] = useRecoilState(lastNameAtom);

  return (
    <div className={styles.user_info}>
      <Steps active={3} />
      <FaChevronLeft className={styles.back} onClick={() => router.back()} />
      <div className={styles.firstname}>
        <div className={styles.input_content}>
          <label>
            Last Name
            <div>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </label>
        </div>
        <span
          className={styles.next}
          onClick={() => router.push("/user-info/complete")}
        >
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
}
