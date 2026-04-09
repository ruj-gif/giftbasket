import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingCart, Mail, TrendingUp } from "lucide-react";
import { api } from "../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    messages: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // ✅ FIXED PRODUCTS CALL
      const productsRes = await api.products.getAll(1, null, "");

      // ✅ ORDERS SAFE
      let ordersRes = { success: false, data: [] };
      if (api.orders?.getAll) {
        ordersRes = await api.orders.getAll();
      }

      // ✅ MESSAGES SAFE
      let messagesRes = { success: false, data: [] };
      if (api.contact_messages?.getAll) {
        messagesRes = await api.contact_messages.getAll();
      }

      // ✅ FIXED REVENUE
      const revenue =
        ordersRes.success && Array.isArray(ordersRes.data)
          ? ordersRes.data.reduce(
              (sum, order) =>
                sum +
                Number(
                  order?.total_amount ||
                    order?.amount ||
                    order?.price ||
                    0
                ),
              0
            )
          : 0;

      setStats({
        products:
          productsRes?.success && Array.isArray(productsRes.data)
            ? productsRes.data.length
            : 0,

        orders:
          ordersRes?.success && Array.isArray(ordersRes.data)
            ? ordersRes.data.length
            : 0,

        messages:
          messagesRes?.success && Array.isArray(messagesRes.data)
            ? messagesRes.data.length
            : 0,

        revenue,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Products",
      value: stats.products,
      icon: Package,
      color: "bg-blue-500",
      link: "/admin/products",
    },
    {
      label: "Total Orders",
      value: stats.orders,
      icon: ShoppingCart,
      color: "bg-green-500",
      link: "/admin/orders",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "bg-purple-500",
      link: "/admin/contact-messages",
    },
    {
      label: "Revenue",
      value: `₹${stats.revenue}`,
      icon: TrendingUp,
      color: "bg-black",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          const Card = stat.link ? Link : "div";

          return (
            <Card
              key={idx}
              {...(stat.link ? { to: stat.link } : {})} // ✅ FIXED
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>

                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/products/new"
            className="flex justify-center items-center gap-2 px-4 py-3 bg-black text-white rounded-lg"
          >
            <Package className="w-5 h-5" />
            Add Product
          </Link>

          <Link
            to="/admin/orders"
            className="flex justify-center items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            View Orders
          </Link>

          <Link
            to="/admin/settings"
            className="flex justify-center items-center px-4 py-3 bg-gray-500 text-white rounded-lg"
          >
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}