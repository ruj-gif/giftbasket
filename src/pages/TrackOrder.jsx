import React, { useState } from "react";
import { api } from "../lib/api";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = async () => {
    const res = await api.orders.getById(orderId);

    if (res.success) {
      setOrder(res.data);
    } else {
      alert("Order not found");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl mb-6">Track Your Order</h1>

      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="border p-2 mb-4"
      />

      <button
        onClick={handleTrack}
        className="bg-black text-white px-6 py-2"
      >
        Track
      </button>

      {order && (
        <div className="mt-6 border p-4">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
        </div>
      )}
    </div>
  );
}