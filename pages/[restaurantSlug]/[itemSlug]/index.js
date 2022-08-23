import { data } from "@data/restaurants";
import { createSlug } from "@utils/index";

export default function ItemPage({ item }) {
  return <main></main>;
}

export async function getStaticPaths() {
  const restaurantsAndItems = data.map((restaurant) => {
    return restaurant.items.map((item) => {
      return {
        params: {
          itemSlug: createSlug(item.name),
          restaurantSlug: createSlug(restaurant.name),
        },
      };
    });
  });

  const paths = restaurantsAndItems.flat();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug, itemSlug } = params;

  const restaurant = data.find(
    (restaurant) => createSlug(restaurant.name) === restaurantSlug
  );

  const item = restaurant.items.find(
    (fItem) => createSlug(fItem.name) === itemSlug
  );

  return {
    props: { item },
  };
}
