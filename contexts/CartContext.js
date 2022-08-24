import { useRouter } from "next/router";
import Cart from "@components/layout/Cart";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Restaurant slug
  const restaurantSlug = router.query.restaurantSlug;

  // Get cart items from local storage on app reload
  useEffect(() => {
    // Update cart items
    setCartItems(JSON.parse(localStorage.getItem(`${restaurantSlug}`)) || []);
  }, []);

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
    (price, currItem) => parseFloat(price + currItem.price),
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
          };
        } else {
          return cartItem;
        }
      });
    }

    setCartItems(updatedItems);

    localStorage.setItem(`${restaurantSlug}`, JSON.stringify(updatedItems));

    router.push(`/${restaurantSlug}`);
  }

  // Remove item from cart
  function removeItemFromCart() {}

  // Checkout cart
  function checkoutCart() {}

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        cartItems,
        totalCartPrice,
        totalCartQuantity,
        addItemToCart,
        removeItemFromCart,
        checkoutCart,
      }}
    >
      {children}
      {/* <Cart /> */}
    </CartContext.Provider>
  );
}
