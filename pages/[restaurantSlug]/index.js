import axios from "axios";
// import fs from "fs";
// import path from "path";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Hero from "@components/restaurant/Hero";
import Items from "@components/restaurant/Items";
import Cart from "@components/layout/Cart";
import { requireLogin, checkUserType } from "@utils/index";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

function RestaurantPage({ restaurant }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    checkUserType(router, user);
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
  // Return the array of slugs
  return {
    paths: [
      {
        params: { restaurantSlug: "not-a-restaurant" },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug } = params;

  // Return the restaurant or notFound
  try {
    const res = await axios.get(
      `https://az-func-testing.azurewebsites.net/api/restaurant/${restaurantSlug}`
    );

    const restaurant = res.data;

    // Throw error if there is no restaurant
    if (!restaurant) {
      throw "No restaurant found";
    }

    // Return the restaurant
    return {
      props: { restaurant },
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
