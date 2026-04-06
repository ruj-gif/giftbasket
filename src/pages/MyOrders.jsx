import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

      if (res?.success) {
        const userOrders = (res.data || []).filter(
          (order) => String(order.user_id) === String(user.id)
        );

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
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg">Please login to view your orders</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center py-12 px-4">

      <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

      {/* ✅ EMPTY STATE (LIKE YOUR IMAGE) */}
      {orders.length === 0 ? (
        <div className="bg-white w-full max-w-2xl p-10 rounded-lg shadow text-center">
          <div className="text-4xl mb-4">📦</div>

          <p className="text-lg font-medium mb-4">No orders yet</p>

          <button
            onClick={() => (window.location.href = "/shop")}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-4">
          {orders.map((order) => {
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
                className="bg-white p-4 rounded-lg shadow"
              >
                <p><strong>Order ID:</strong> {order.id}</p>

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

                {items.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-600 list-disc ml-5">
                    {items.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                )}

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