import restaurants from "@data/restaurants";
import Hero from "@components/restaurant/Hero";
import Items from "@components/restaurant/Items";
import { createSlug } from "@utils/index";
import Cart from "@components/layout/Cart";
import { useCart } from "@contexts/CartContext";

export default function RestaurantPage({ restaurant }) {
  return (
    <main>
      <Hero restaurant={restaurant} />
      <Items restaurant={restaurant} />
      <Cart />
    </main>
  );
}

export async function getStaticPaths() {
  // Restaurant name slugs
  const slugs = restaurants.map((restaurant) => {
    return {
      params: {
        restaurantSlug: createSlug(restaurant.name),
      },
    };
  });

  // Return the array of slugs
  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug } = params;

  // Find the restaurant with slug
  const restaurant = restaurants.find(
    (restaurant) => createSlug(restaurant.name) === restaurantSlug
  );

  // Return the restaurant
  return {
    props: { restaurant },
  };
}
