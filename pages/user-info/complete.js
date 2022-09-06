import axios from "axios";
import Steps from "@components/Steps";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { ImArrowRight } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { firstNameAtom, lastNameAtom } from "@atoms/userinfo";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function Complete() {
  // router
  const router = useRouter();

  // recoil values
  const firstName = useRecoilValue(firstNameAtom);
  const lastName = useRecoilValue(lastNameAtom);

  // handle go to main page
  const handleClick = () => {
    // uncomment all the commented code

    //   axios
    //     .post("/api/saveUserInfo", {
    //       firstName,
    //       lastName,
    //     })
    //     .then(() => {
    //       console.log("object");
    //     })
    //     .catch((e) => console.log("An error has occurred", e));

    localStorage.setItem("type", "existing");

    const visitedURL = JSON.parse(localStorage.getItem("visited-url"));

    if (visitedURL) {
      router.push(`/${visitedURL}`);
    }
  };

  return (
    <div className={styles.user_info}>
      <Steps active={4} />
      <FaChevronLeft className={styles.back} onClick={() => router.back()} />
      <div className={styles.complete}>
        <div className={styles.content}>
          <h6>Hello!</h6>
          <span className={styles.proceeding}>
            By proceeding you accept our <a>terms</a> & <a>conditions</a>
          </span>
        </div>

        <span className={styles.next} onClick={handleClick}>
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
}
