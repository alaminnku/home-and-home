import axios from "axios";
// import fs from "fs";
// import path from "path";
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
    paths: [
      {
        params: { itemSlug: "not-an-item", restaurantSlug: "not-a-restaurant" },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug, itemSlug } = params;

  // try {
  //   // Get the restaurant
  //   const restaurant = fs
  //     .readdirSync(path.join("data"))
  //     .find((fileName) => fileName === `${restaurantSlug}.json`);

  //   // Get the data
  //   const data = fs.readFileSync(path.join("data", restaurant), "utf-8");

  //   // Parse the data
  //   const parsedData = JSON.parse(data);

  //   // Get the item
  //   const item = parsedData.categories
  //     .map((category) => category.items)
  //     .flat()
  //     .find((item) => createSlug(item.name) === itemSlug);

  //   // If no item found then throw an err
  //   if (!item) {
  //     throw "No item found";
  //   }

  //   // Return the item
  //   return {
  //     props: { item },
  //   };
  // } catch (err) {
  //   // If an item is not found
  //   if (err) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  // }

  // Return the item or notFound
  try {
    const res = await axios.get(
      `https://az-func-testing.azurewebsites.net/api/restaurant/${restaurantSlug}`
    );

    const restaurant = res.data;

    // Get the item
    const item = restaurant.categories
      .map((category) => category.items)
      .flat()
      .find((item) => createSlug(item.name) === itemSlug);

    // If no item found then throw an err
    if (!item) {
      throw "No item found";
    }

    // Return the item
    return {
      props: { item },
    };
  } catch (err) {
    // If an item is not found
    if (err) {
      return {
        notFound: true,
      };
    }
  }
}

export default requireLogin ? withPageAuthRequired(ItemPage) : ItemPage;
