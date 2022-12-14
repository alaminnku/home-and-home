import axios from "axios";
import Steps from "@components/steps";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { firstNameAtom, addressAtom } from "@atoms/userinfo";
import { useUser } from "@auth0/nextjs-auth0";
import { useExistingUser } from "@contexts/ExistingUserContext";
import styles from "@styles/userInfo/UserInfo.module.css";

export default function Complete() {
  // router and hooks
  const router = useRouter();
  const { user } = useUser();
  const { setExistingUser } = useExistingUser();

  // User details
  const userId = user?.sub;
  const userEmail = user?.email;
  const userPhone = user?.name;

  // recoil values
  const firstName = useRecoilValue(firstNameAtom);
  const address = useRecoilValue(addressAtom);

  // handle go to main page
  const handleClick = async () => {
    try {
      // Post the data to API
      const res = await axios.post("/api/save-user-info", {
        firstName,
        address,
        userId,
        userEmail,
        userPhone,
      });

      // Update the state
      setExistingUser(res.data.attributes.user);
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
            {firstName}
            {/* {firstName} {lastName} */}
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
