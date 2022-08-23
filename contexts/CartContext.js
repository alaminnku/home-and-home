import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  // Get cart items from local storage on app reload
  useEffect(() => {
    // Restaurant slug
    const restaurantSlug = router.query.restaurantSlug;

    // Items from local storage
    const localItems = JSON.parse(localStorage.getItem("cart-items"));

    // Update cart items
    setCartItems(
      localItems?.some(
        (localItem) => localItem.restaurantSlug === restaurantSlug
      )
        ? localItems
        : []
    );
  }, []);

  // Add item to cart
  function addItemToCart(initialItem) {
    let updatedItems = [];

    if (!cartItems.some((cartItem) => cartItem.id === initialItem.id)) {
      updatedItems = [...cartItems, initialItem];
    } else {
      updatedItems = cartItems.map((cartItem) => {
        if (cartItem.id === initialItem.id) {
          return {
            ...cartItem,
            quantity: initialItem.quantity,
          };
        } else {
          return cartItem;
        }
      });
    }

    setCartItems(updatedItems);

    localStorage.setItem("cart-items", JSON.stringify(updatedItems));
  }

  // Remove item from cart
  function removeItemFromCart() {}

  // Checkout cart
  function checkoutCart() {}

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
