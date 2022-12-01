import Link from "next/link";
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
    <main className={styles.home}>
      <h1>Welcome to Home and Home</h1>
      {isLoading || loading ? (
        <p>Loading</p>
      ) : user ? (
        <>
          <Link href="/api/auth/logout">
            <a onClick={() => localStorage.removeItem("type")}>Logout</a>
          </Link>
          <h1>Hi.</h1>
          <h2>user.name = {user.name}</h2>
          <h2>user.sub = {user.sub}</h2>
        </>
      ) : (
        <div className={styles.buttons}>
          <Link href="/api/auth/login">
            <a>Login</a>
          </Link>

          <Link href="/chinese-dragon-cafe">
            <a>Visit Chinese Dragon Cafe</a>
          </Link>
        </div>
      )}
      {error ? <h4>{error.message}</h4> : ""}
    </main>
  );
}
