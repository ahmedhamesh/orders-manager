import type { OrderStatus } from "../../../../interfaces/types";
import { useOrders } from "../../hook/useOrders";
import "./OrdersTable.css";

export default function OrdersTable() {
  const { orders, filterStatus, updateOrderStatus } = useOrders();

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  if (filteredOrders.length === 0) {
    return <p className="no-orders">No orders found.</p>;
  }

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Creation Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.map((order) => (
          <tr key={order.id}>
            <td data-label="Customer Name">{order.customerName}</td>
            <td data-label="Creation Date">{order.createdAt}</td>
            <td data-label="Status">
              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order.id, e.target.value as OrderStatus)
                }
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
