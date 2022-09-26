import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Steps from "@components/steps";
import { addressAtom } from "@atoms/userinfo";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function Address() {
  // router
  const router = useRouter();

  // states
  const [address, setAddress] = useRecoilState(addressAtom);

  return (
    <div className={styles.user_info}>
      <Steps active={3} />
      <FaChevronLeft className={styles.back} onClick={() => router.back()} />
      <div className={styles.firstname}>
        <div className={styles.input_content}>
          <label>
          And what&apos;s your delivery address?
            <div>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <span className="caveat" style={{fontSize : '12px', paddingTop : '15px'}}> Don&apos;t worry! You can always change this later </span>
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
