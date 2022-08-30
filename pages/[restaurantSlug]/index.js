import fs from "fs";
import path from "path";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Hero from "@components/restaurant/Hero";
import Items from "@components/restaurant/Items";
import Cart from "@components/layout/Cart";
import { requireLogin } from "@utils/index";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function RestaurantPage({ restaurant }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const userType = localStorage.getItem("type");

    if (user) {
      if (user.type === "new" && !localStorage.getItem("type")) {
        localStorage.setItem("visited-url", JSON.stringify(router.asPath));

        router.push("/user-info");
      } else if (userType === "existing") {
        localStorage.removeItem("visited-url");
      }
    }
  }, [router, user]);

  return (
    <main>
      <Hero restaurant={restaurant} />
      <Items restaurant={restaurant} />
      <Cart />
    </main>
  );
}

export async function getStaticPaths() {
  // Slugs
  const paths = fs.readdirSync(path.join("data")).map((fileName) => {
    return {
      params: { restaurantSlug: fileName.replace(".json", "") },
    };
  });

  // Return the array of slugs
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug } = params;

  // Return the restaurant or notFound
  try {
    // Get the file with restaurant slug
    const data = fs.readFileSync(
      path.join("data", `${restaurantSlug}.json`),
      "utf-8"
    );

    // Parse the data
    const restaurant = JSON.parse(data);

    // If no item found then throw an err
    if (!restaurant) {
      throw "No restaurant found";
    }

    // Return the restaurant
    return {
      props: { restaurant },
      revalidate: 1,
    };
  } catch (err) {
    // If a restaurant is not found
    if (err) {
      return {
        notFound: true,
      };
    }
  }
}

export default requireLogin
  ? withPageAuthRequired(RestaurantPage)
  : RestaurantPage;
