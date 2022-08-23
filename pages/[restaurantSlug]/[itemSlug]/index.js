import Item from "@components/item/Item";
import restaurants from "@data/restaurants";
import { createSlug } from "@utils/index";

export default function ItemPage({ item }) {
  return (
    <main>
      <Item item={item} />
    </main>
  );
}

export async function getStaticPaths() {
  // Get all the restaurants and their items
  const restaurantsAndItems = restaurants.map((restaurant) => {
    return restaurant.items.map((item) => {
      return {
        params: {
          itemSlug: createSlug(item.name),
          restaurantSlug: createSlug(restaurant.name),
        },
      };
    });
  });

  // Flat the array
  const paths = restaurantsAndItems.flat();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug, itemSlug } = params;

  // Find the restaurant
  const restaurant = restaurants.find(
    (restaurant) => createSlug(restaurant.name) === restaurantSlug
  );

  // Find the item in the restaurant
  const item = restaurant.items.find(
    (fItem) => createSlug(fItem.name) === itemSlug
  );

  return {
    props: { item },
  };
}
