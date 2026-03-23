import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Mail, TrendingUp } from 'lucide-react';
import { api } from '../../lib/api';

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
      const [productsRes, ordersRes, messagesRes] = await Promise.all([
        api.products.getAll(),
        api.orders.getAll(),
        api.contact_messages.getAll(),
      ]);

      const revenue = ordersRes.success ? ordersRes.data.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) : 0;

      setStats({
        products: productsRes.success ? productsRes.data.length : 0,
        orders: ordersRes.success ? ordersRes.data.length : 0,
        messages: messagesRes.success ? messagesRes.data.length : 0,
        revenue,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-500', link: '/admin/products' },
    { label: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'bg-green-500', link: '/admin/orders' },
    { label: 'Messages', value: stats.messages, icon: Mail, color: 'bg-purple-500', link: '/admin/contact-messages' },
    { label: 'Revenue', value: `₹${stats.revenue.toFixed(0)}`, icon: TrendingUp, color: 'bg-primary' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          const Card = stat.link ? Link : 'div';
          return (
            <Card key={idx} to={stat.link} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Link to="/admin/products/new" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-primary text-secondary rounded-lg hover:bg-primary-dark transition-colors touch-manipulation text-sm sm:text-base">
            <Package className="w-5 h-5" />
            <span className="font-semibold">Add Product</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors touch-manipulation text-sm sm:text-base">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">View Orders</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors touch-manipulation text-sm sm:text-base">
            <span className="font-semibold">Site Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}