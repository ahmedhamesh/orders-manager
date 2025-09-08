import { useContext } from "react";
import { OrdersContext } from "../context/OrdersContext";

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return ctx;
}
