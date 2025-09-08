export type OrderStatus = "New" | "In Progress" | "Done";

export interface Order {
  id: number;
  customerName: string;
  description: string;
  status: OrderStatus;
  createdAt: string;
}
