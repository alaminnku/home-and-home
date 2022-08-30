import fs from "fs";
import path from "path";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Item from "@components/item";
import { createSlug, requireLogin } from "@utils/index";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";

function ItemPage({ item }) {
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
      <Item item={item} />
    </main>
  );
}

export async function getStaticPaths() {
  // Get all restaurants data
  const data = fs.readdirSync(path.join("data")).map((restaurantName) => {
    const data = fs.readFileSync(path.join("data", restaurantName), "utf-8");

    return JSON.parse(data);
  });

  // Get all restaurant's name and items
  const restaurantsAndItems = data.map((restaurant) => {
    return restaurant.categories.map((category) => {
      return category.items.map((item) => {
        return {
          params: {
            itemSlug: createSlug(item.name),
            restaurantSlug: createSlug(restaurant.name),
          },
        };
      });
    });
  });

  // Flat the array
  const paths = restaurantsAndItems.flat(2);

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug, itemSlug } = params;

  // Return the item or notFound
  try {
    // Get the restaurant
    const restaurant = fs
      .readdirSync(path.join("data"))
      .find((fileName) => fileName === `${restaurantSlug}.json`);

    // Get the data
    const data = fs.readFileSync(path.join("data", restaurant), "utf-8");

    // Parse the data
    const parsedData = JSON.parse(data);

    // Get the item
    const item = parsedData.categories
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
      revalidate: 1,
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
