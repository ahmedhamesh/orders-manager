import "./styles.css";
import { OrdersProvider } from "./modules/Orders/context/OrdersContext";
import { Orders } from "./modules/Orders";

function App() {
  return (
    <OrdersProvider>
      <div className="container">
        <h1 className="header">Orders Manager</h1>
        <Orders />
      </div>
    </OrdersProvider>
  );
}

export default App;
