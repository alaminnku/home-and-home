import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export function OrderProvider({ children }) {
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderAttributes, setOrderAttributes] = useState(null);

  return (
    <OrderContext.Provider
      value={{
        placingOrder,
        setPlacingOrder,
        orderAttributes,
        setOrderAttributes,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
