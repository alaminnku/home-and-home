import axios from "axios";
import Steps from "@components/Steps";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { ImArrowRight } from "react-icons/im";
import { FaChevronLeft } from "react-icons/fa";
import { firstNameAtom, lastNameAtom } from "@atoms/userinfo";
import styles from "@styles/userInfo/userInfo.module.css";

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
    localStorage.setItem("type", "existing");
    router.push("/");
    //     })
    //     .catch((e) => console.log("An error has occurred", e));
  };

  return (
    <div className={styles.user_info}>
      <Steps active={4} />
      <FaChevronLeft className={styles.back} onClick={() => router.back()} />
      <div className={styles.wrap}>
        <h6>Hello!</h6>
        <p>
          {firstName} {lastName}
        </p>
        <div onClick={handleClick}>
          <span className={styles.proceeding}>
            By proceeding you accept our <a>terms</a> & <a>conditions</a>
          </span>
          <ImArrowRight />
        </div>
      </div>
    </div>
  );
}
