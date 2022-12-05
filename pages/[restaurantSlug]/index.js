import fs from "fs";
import path from "path";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Hero from "@components/restaurant/Hero";
import Items from "@components/restaurant/Items";
import Cart from "@components/layout/Cart";
import { requireLogin, checkUserType, baseUrl } from "@utils/index";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function RestaurantPage({ restaurant }) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(requireLogin);

  useEffect(() => {
    checkUserType(router, user, setIsLoading);
  }, [router, user]);

  return (
    <main>
      <Hero restaurant={restaurant} isLoading={isLoading} />
      <Items restaurant={restaurant} isLoading={isLoading} />
      <Cart />
    </main>
  );
}

export async function getStaticPaths() {
  // Paths
  const paths = fs.readdirSync(path.join("data")).map((fileName) => {
    return {
      params: { restaurantSlug: fileName.replace(".json", "") },
    };
  });

  // Return the array of paths
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug } = params;

  // Get the file with restaurant slug
  const data = fs.readFileSync(
    path.join("data", `${restaurantSlug}.json`),
    "utf-8"
  );

  // Parse the data
  const restaurant = JSON.parse(data);

  // Return notFound is not restaurant is found
  if (!restaurant) {
    return {
      notFound: true,
    };
  }

  // Return the restaurant
  return {
    props: { restaurant },
  };
}

export default requireLogin
  ? withPageAuthRequired(RestaurantPage)
  : RestaurantPage;
