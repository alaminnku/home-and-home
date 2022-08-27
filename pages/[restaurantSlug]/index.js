import fs from "fs";
import path from "path";
import Hero from "@components/restaurant/Hero";
import Items from "@components/restaurant/Items";
import Cart from "@components/layout/Cart";

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
  // Slugs
  const paths = fs.readdirSync(path.join("data")).map((fileName) => {
    return {
      params: { restaurantSlug: fileName.replace(".json", "") },
    };
  });

  // Return the array of slugs
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { restaurantSlug } = params;

  // Get the file with restaurant slug
  const data = fs.readFileSync(
    path.join("data", `${restaurantSlug}.json`),
    "utf-8"
  );

  // Parse the data
  const restaurant = JSON.parse(data);

  // Return the restaurant
  return {
    props: { restaurant },
  };
}
