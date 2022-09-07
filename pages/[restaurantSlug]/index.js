import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Hero from "@components/restaurant/Hero";
import Items from "@components/restaurant/Items";
import Cart from "@components/layout/Cart";
import { requireLogin, checkUserType } from "@utils/index";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function RestaurantPage({ restaurant }) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserType(router, user, setIsLoading);
    setIsLoading(true);
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
  // Return the array of slugs
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug } = params;

  // Fetch the restaurant
  const res = await axios.get(
    `https://az-func-testing.azurewebsites.net/api/restaurant/${restaurantSlug}`
  );

  const restaurant = res.data;

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
