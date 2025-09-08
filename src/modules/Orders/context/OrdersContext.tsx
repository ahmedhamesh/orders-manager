import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Order, OrderStatus } from "../../../interfaces/types";

type Filter = "All" | OrderStatus;

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  filterStatus: Filter;
  setFilterStatus: (status: Filter) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void;
  updateOrderStatus: (id: number, status: OrderStatus) => void;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined
);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<Filter>("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/orders.json");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const addOrder = (newOrder: Omit<Order, "id" | "createdAt">) => {
    const order: Order = {
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
      ...newOrder,
    };
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (id: number, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
