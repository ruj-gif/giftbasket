import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ GET LOGGED-IN USER
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.orders.getAll();

      console.log("LOGGED USER:", user);
      console.log("ALL ORDERS:", res.data);

      if (res?.success) {
        const userOrders = (res.data || []).filter(
          (order) => String(order.user_id) === String(user.id)
        );

        console.log("FILTERED ORDERS:", userOrders);

        setOrders(userOrders);
      }
    } catch (err) {
      console.error("Orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ NOT LOGGED IN
  if (!user) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl mb-4">Please login to view your orders</h2>
      </div>
    );
  }

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6 font-semibold">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            // ✅ SAFE PARSE ITEMS
            let items = [];

            try {
              const raw = order.order_items || order.items;

              items =
                typeof raw === "string"
                  ? JSON.parse(raw)
                  : Array.isArray(raw)
                  ? raw
                  : [];
            } catch {
              items = [];
            }

            return (
              <div
                key={order.id}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-blue-600">
                    {order.status || "Processing"}
                  </span>
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {order.total_amount || order.total || 0}
                </p>

                {/* ✅ ITEMS */}
                {items.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Items:</p>
                    <ul className="list-disc ml-5 text-sm text-gray-600">
                      {items.map((item, i) => (
                        <li key={i}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ✅ DATE */}
                {order.created_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}