// Create slug
export const createSlug = (name) => name.toLowerCase().split(" ").join("-");

// Convert number
export const convertNumber = (number) =>
  parseFloat(number).toLocaleString("en-US");

// Require login flag
export const requireLogin = true;

// Base API URL
export const baseUrl = "https://az-func-testing.azurewebsites.net";

// Check the user type
export function checkUserType(router, user, setIsLoading) {
  const url = router.asPath;
  const userType = localStorage.getItem("type");

  if (user) {
    if (user.type === "new" && !localStorage.getItem("type")) {
      localStorage.setItem("visited-url", JSON.stringify(url));

      setTimeout(() => {
        router.push("/user-info");
      }, 2000);
    } else if (userType === "existing" || user.type === "existing") {
      setIsLoading(false);
      localStorage.removeItem("visited-url");
    }
  }
}
