import { data } from "@data/restaurants";
import Hero from "@components/restaurant/Hero";
import Items from "@components/restaurant/Items";
import { createSlug } from "@utils/index";

export default function RestaurantPage({ restaurant }) {
  return (
    <main>
      <Hero restaurant={restaurant} />
      <Items restaurant={restaurant} />
    </main>
  );
}

export async function getStaticPaths() {
  // Restaurant name slugs
  const slugs = data.map((restaurant) => {
    return {
      params: {
        slug: createSlug(restaurant.name),
      },
    };
  });

  // Return the array of slugs
  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // Find the restaurant with slug
  const restaurant = data.find(
    (restaurant) => restaurant.name.toLowerCase() === slug.split("-").join(" ")
  );

  // Return the restaurant
  return {
    props: { restaurant },
  };
}
