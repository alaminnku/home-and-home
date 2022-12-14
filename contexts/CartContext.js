import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // // Restaurant slug
  const { restaurantSlug } = router.query;

  // Get cart items from local storage on app reload
  useEffect(() => {
    setCartItems(
      JSON.parse(localStorage.getItem(`${restaurantSlug}-cart`)) || []
    );
  }, [router.isReady]);

  // Cart open and close functions
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Calculate total quantity
  const totalCartQuantity = cartItems.reduce(
    (quantity, currItem) => quantity + currItem.quantity,
    0
  );

  // Calculate total price
  const totalCartPrice = cartItems.reduce(
    (price, currItem) => price + currItem.total,
    0
  );

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
            total: initialItem.total,
            note: initialItem.note,
          };
        } else {
          return cartItem;
        }
      });
    }

    setCartItems(updatedItems);

    localStorage.setItem(
      `${restaurantSlug}-cart`,
      JSON.stringify(updatedItems)
    );

    router.push(`/${restaurantSlug}`);
  }

  // Remove item from cart
  function removeItemFromCart(itemId) {
    const updatedItems = cartItems.filter((cartItem) => cartItem.id !== itemId);

    setCartItems(updatedItems);

    localStorage.setItem(
      `${restaurantSlug}-cart`,
      JSON.stringify(updatedItems)
    );

    cartItems.length === 1 && closeCart();
  }

  // Remove item from page
  function removeItemFromPage(itemId) {
    const updatedItems = cartItems.filter((cartItem) => cartItem.id !== itemId);

    setCartItems(updatedItems);

    localStorage.setItem(
      `${restaurantSlug}-cart`,
      JSON.stringify(updatedItems)
    );

    router.push(`/${restaurantSlug}`);

    cartItems.length > 1 && openCart();
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        cartItems,
        setCartItems,
        totalCartPrice,
        totalCartQuantity,
        addItemToCart,
        removeItemFromCart,
        removeItemFromPage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
