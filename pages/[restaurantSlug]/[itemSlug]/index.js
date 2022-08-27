import fs from "fs";
import path from "path";
import Item from "@components/item/Item";
import { createSlug } from "@utils/index";

export default function ItemPage({ item }) {
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

    // Return the item
    return {
      props: { item },
    };
  } catch (err) {
    // // If an item is not found
    if (err) {
      return {
        notFound: true,
      };
    }
  }
}
