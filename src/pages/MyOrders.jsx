import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.orders.getAll();

      console.log("Orders:", res);

      if (res?.success) {
        setOrders(res.data || []);
      }
    } catch (err) {
      console.error("Orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow"
            >
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}