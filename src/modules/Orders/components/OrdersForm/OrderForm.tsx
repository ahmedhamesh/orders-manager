import type { OrderStatus } from "../../../../interfaces/types";
import { useOrders } from "../../hook/useOrders";
import "./OrdersForm.css";
import { useState, useEffect, useRef } from "react";

interface OrderFormProps {
  onClose: () => void;
}

export default function OrderForm({ onClose }: OrderFormProps) {
  const { addOrder } = useOrders();
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    customerName: "",
    description: "",
    status: "New" as OrderStatus,
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerName.trim() || !form.description.trim()) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    addOrder(form);
    setForm({ customerName: "", description: "", status: "New" });
    setError("");
    onClose();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="form-popup">
      <div ref={formRef} className="order-form">
        <h2>Add New Order</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Add Order
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
