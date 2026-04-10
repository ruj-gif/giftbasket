import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, ChevronRight } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { api } from "../lib/api";
import LoadingSpinner from "../components/LoadingSpinner";

const STATUS_LABELS = {
  pending: "Order Placed",
  processing: "Processing",
  completed: "Delivered",
  cancelled: "Cancelled",
};

export default function MyOrdersPage() {
  const { user, isLoggedIn } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, user?.id]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.orders.getAll();

      console.log("USER:", user);
      console.log("ALL ORDERS:", res.data);

      if (res?.success) {
        let list = Array.isArray(res.data) ? res.data : [];

        // ✅ IMPORTANT: FILTER USER-SPECIFIC ORDERS
        list = list.filter(
          (order) =>
            String(order.user_id) === String(user?.id)
        );

        console.log("FILTERED:", list);

        setOrders(list);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">My Orders</h1>
          <p className="mb-6">Please login to view your orders.</p>
          <Link to="/login" className="bg-black text-white px-6 py-2 rounded">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-10 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-500 mb-6">{user?.email}</p>

        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded shadow">
            <Package className="mx-auto mb-4" size={40} />
            <p>No orders found</p>
            <Link to="/shop" className="text-blue-600 mt-4 block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              let items = [];

              // ✅ SAFE PARSE
              try {
                items = order.order_items
                  ? typeof order.order_items === "string"
                    ? JSON.parse(order.order_items)
                    : order.order_items
                  : [];
              } catch {
                items = [];
              }

              const itemCount = items.reduce(
                (sum, i) => sum + (i.quantity || 0),
                0
              );

              const statusLabel =
                STATUS_LABELS[order.status] || order.status;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded shadow p-5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        {order.id}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>

                      <p className="text-sm mt-1">
                        {itemCount} item{itemCount !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ₹{order.total_amount || order.total}
                      </p>

                      <span className="text-sm text-blue-600">
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* ✅ OPTIONAL: SHOW ITEMS */}
                  {items.length > 0 && (
                    <div className="mt-3 text-sm text-gray-600">
                      {items.map((item, i) => (
                        <div key={i}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-6">
          <Link to="/home" className="text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}