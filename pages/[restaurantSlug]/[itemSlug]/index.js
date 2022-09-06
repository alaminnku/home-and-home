import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Item from "@components/item";
import { createSlug, requireLogin, checkUserType } from "@utils/index";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

function ItemPage({ item }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    checkUserType(router, user);
  }, [router, user]);

  return (
    <main>
      <Item item={item} />
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug, itemSlug } = params;

  // Fetch the restaurant
  const res = await axios.get(
    `https://az-func-testing.azurewebsites.net/api/restaurant/${restaurantSlug}`
  );

  const restaurant = res.data;

  // Get the item
  const item = restaurant.categories
    .map((category) => category.items)
    .flat()
    .find((item) => createSlug(item.name) === itemSlug);

  // Return notFound if no item is found
  if (!item) {
    return {
      notFound: true,
    };
  }

  // Return the item
  return {
    props: { item },
  };
}

export default requireLogin ? withPageAuthRequired(ItemPage) : ItemPage;
