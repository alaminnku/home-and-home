// Create slug
export const createSlug = (name) => name.toLowerCase().split(" ").join("-");

// Convert number
export const convertNumber = (number) =>
  parseFloat(number).toLocaleString("en-US");

// Require login flag
export const requireLogin = true;

// Check the user type
export function checkUserType(router, user) {
  const url = router.asPath;
  const userType = localStorage.getItem("type");

  if (user) {
    if (user.type === "new" && !localStorage.getItem("type")) {
      localStorage.setItem("visited-url", JSON.stringify(url));

      router.push("/user-info");
    } else if (userType === "existing") {
      localStorage.removeItem("visited-url");
    }
  }
}
