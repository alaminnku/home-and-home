import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "@styles/home/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const [loading, setLoading] = useState(true);

  if (user) {
    console.log(user);
  }

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (user) {
      if (user.type === "new" && !localStorage.getItem("type")) {
        router.push("/user-info");
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [router, user]);

  return (
    <div className={styles.container}>
      <h1>Welcome to Universal Passwordless Login With NextJS and Auth0</h1>
      {isLoading || loading ? (
        <p>Loading</p>
      ) : user ? (
        <>
          <a
            href="/api/auth/logout "
            onClick={() => localStorage.removeItem("type")}
          >
            Logout
          </a>
          <h1>Hi.</h1>
          <h2>user.name = {user.name}</h2>
          <h2>user.sub = {user.sub}</h2>
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
      {error ? <h4>{error.message}</h4> : ""}
    </div>
  );
}
