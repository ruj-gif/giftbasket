import React, { useState } from "react";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";

export default function AddOrder() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    city: "",
    zipcode: "",
    status: "pending",
  });

  const [items, setItems] = useState([
    { product_name: "", price: "", quantity: 1 },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { product_name: "", price: "", quantity: 1 }]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    const payload = {
      ...form,
      order_items: items,
      subtotal,
      shipping_charge: 0,
      tax_amount: 0,
      total_amount: subtotal,
    };

    const res = await api.orders.create(payload);

    if (res.success) {
      alert("Order Created ✅");
      navigate("/admin/orders");
    } else {
      alert("Failed to create order ❌");
    }
  };

  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-2xl font-bold mb-6">Add Order</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* CUSTOMER */}
        <div className="grid md:grid-cols-3 gap-4">
          <input name="customer_name" placeholder="Name" onChange={handleChange} className="border p-2" required />
          <input name="customer_email" placeholder="Email" onChange={handleChange} className="border p-2" />
          <input name="customer_phone" placeholder="Phone" onChange={handleChange} className="border p-2" />
        </div>

        {/* ADDRESS */}
        <div className="grid md:grid-cols-3 gap-4">
          <input name="shipping_address" placeholder="Address" onChange={handleChange} className="border p-2" />
          <input name="city" placeholder="City" onChange={handleChange} className="border p-2" />
          <input name="zipcode" placeholder="Zipcode" onChange={handleChange} className="border p-2" />
        </div>

        {/* ITEMS */}
        <div>
          <h2 className="font-semibold mb-2">Order Items</h2>

          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-4 gap-3 mb-2">
              <input
                placeholder="Product"
                value={item.product_name}
                onChange={(e) =>
                  handleItemChange(i, "product_name", e.target.value)
                }
                className="border p-2"
              />
              <input
                placeholder="Price"
                type="number"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(i, "price", e.target.value)
                }
                className="border p-2"
              />
              <input
                placeholder="Qty"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(i, "quantity", e.target.value)
                }
                className="border p-2"
              />

              <button
                type="button"
                onClick={() => removeItem(i)}
                className="bg-red-500 text-white"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-4 py-2 bg-gray-200"
          >
            + Add Item
          </button>
        </div>

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* SUBMIT */}
        <button className="w-full bg-black text-white py-3">
          Create Order
        </button>

      </form>
    </div>
  );
}