import { useState } from "react";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import OrderForm from "./components/OrdersForm/OrderForm";
import { useOrders } from "./hook/useOrders";
import Loader from "../../components/Loader";
import OrdersFilter from "./components/OrderFilter/OrdersFilter";
import "./index.css";

export function Orders() {
  const { loading, error } = useOrders();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <div className="filters-and-button">
        <OrdersFilter />
        <button className="add-new-button" onClick={openForm}>
          Add New
        </button>
      </div>
      {isFormVisible && <OrderForm onClose={closeForm} />}
      <OrdersTable />
    </>
  );
}
