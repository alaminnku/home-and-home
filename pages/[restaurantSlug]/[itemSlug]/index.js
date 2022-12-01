import fs from "fs";
import path from "path";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Item from "@components/item";
import { createSlug, requireLogin, checkUserType, baseUrl } from "@utils/index";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

function ItemPage({ item }) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(requireLogin);

  useEffect(() => {
    checkUserType(router, user, setIsLoading);
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

  // Get the restaurant
  const restaurantFile = fs
    .readdirSync(path.join("data"))
    .find((fileName) => fileName === `${restaurantSlug}.json`);

  // Get the data
  const data = fs.readFileSync(path.join("data", restaurantFile), "utf-8");

  // Parse the data
  const restaurant = JSON.parse(data);

  // Get the initial item
  const initialItem = restaurant.categories
    .map((category) => category.items)
    .flat()
    .find((item) => createSlug(item.name) === itemSlug);

  // Get the category
  const category = restaurant.categories.find((category) =>
    category.items.find(
      (itemInCategory) => itemInCategory.id === initialItem?.id
    )
  )?.name;

  // Final item
  const item = { ...initialItem, category };

  // Return notFound if no item is found
  if (!initialItem) {
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
