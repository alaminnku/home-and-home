import { useRouter } from "next/router";
import Steps from "@components/steps";
import { useRecoilState } from "recoil";
import { firstNameAtom } from "../../atoms/userinfo";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function Firstname() {
  // router
  const router = useRouter();

  // states
  const [firstName, setFirstName] = useRecoilState(firstNameAtom);

  return (
    <div className={styles.user_info}>
      <Steps active={2} />

      <FaChevronLeft className={styles.back} onClick={() => router.back()} />

      <div className={styles.firstname}>
        <div className={styles.input_content}>
          <label>
            What's your good name?
            <div>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </label>
        </div>
        <span
          className={styles.next}
          onClick={() => router.push("/user-info/address")}
        >
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
}
