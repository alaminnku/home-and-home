import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { baseUrl } from "@utils/index";
import { createContext, useContext, useEffect, useState } from "react";

// Create context
const ExistingUserContext = createContext();

// Create hook
export const useExistingUser = () => useContext(ExistingUserContext);

// Provider function
export function ExistingUserProvider({ children }) {
  const { user } = useUser();
  const [existingUser, setExistingUser] = useState(null);

  useEffect(() => {
    // Get user type from local storage
    const userType = localStorage.getItem("type");

    // If there is a user
    if (user) {
      // If user type is existing
      if (userType === "existing" || user.type === "existing") {
        async function getUser() {
          // Get the user details
          const res = await axios.get(`${baseUrl}/api/user/${user.sub}`);

          // Update the state
          setExistingUser(res.data.data.attributes);
        }
        getUser();
      }
    }
  }, [user]);

  return (
    <ExistingUserContext.Provider value={{ existingUser, setExistingUser }}>
      {children}
    </ExistingUserContext.Provider>
  );
}
