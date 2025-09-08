import { useOrders } from "../../hook/useOrders";
import "./OrdersFilter.css";

export default function OrdersFilter() {
  const { filterStatus, setFilterStatus } = useOrders();

  return (
    <div className="filter-container">
      <label className="filter-label">Filter:</label>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as any)}
      >
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}
