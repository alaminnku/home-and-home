import Item from "@components/item/Item";
import { data } from "@data/restaurants.json";
import { createSlug } from "@utils/index";

export default function ItemPage({ item }) {
  return (
    <main>
      <Item item={item} />
    </main>
  );
}

export async function getStaticPaths() {
  // Restaurants and items
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
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug, itemSlug } = params;

  // Find the restaurant
  const restaurant = data.find(
    (restaurant) => createSlug(restaurant.name) === restaurantSlug
  );

  //
  const item = restaurant.categories
    .map((category) => category.items)
    .flat()
    .find((item) => createSlug(item.name) === itemSlug);

  return {
    props: { item },
  };
}
