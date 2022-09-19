import axios from "axios";
import Steps from "@components/steps";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { firstNameAtom, lastNameAtom } from "@atoms/userinfo";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function Complete() {
  // router
  const router = useRouter();
  const { user } = useUser();

  // User details
  const userId = user?.sub;
  const userEmail = user?.email;
  const userPhone = user?.name;

  // recoil values
  const firstName = useRecoilValue(firstNameAtom);
  const lastName = useRecoilValue(lastNameAtom);

  // handle go to main page
  const handleClick = async () => {
    try {
      // Post the data to API
      const res = await axios.post("/api/saveUserInfo", {
        firstName,
        lastName,
        userId,
        userEmail,
        userPhone,
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    // Save user type to local storage
    localStorage.setItem("type", "existing");

    // Push to the visited URL page
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
          <p>
            {firstName} {lastName}
          </p>
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
