import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const response = await api.orders.getById(id);
      if (response.success) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await api.orders.update(id, { status: newStatus });
      loadOrder();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const orderItems = order.order_items ? (typeof order.order_items === 'string' ? JSON.parse(order.order_items) : order.order_items) : [];

  return (
    <div className="max-w-4xl w-full">
      <button
        onClick={() => navigate('/admin/orders')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 py-2 touch-manipulation"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Orders
      </button>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h1>
            <p className="text-sm text-gray-600">Order ID: <span className="font-mono">{order.id}</span></p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className="w-full sm:w-auto min-w-[140px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary touch-manipulation"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
            <p className="text-sm text-gray-600">{order.customer_name}</p>
            <p className="text-sm text-gray-600">{order.customer_email}</p>
            <p className="text-sm text-gray-600">{order.customer_phone}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
            <p className="text-sm text-gray-600">{order.shipping_address}</p>
            <p className="text-sm text-gray-600">{order.city}, {order.zipcode}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-3">
            {orderItems.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{item.product_name}</p>
                  {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">₹{(Number(item.price) * item.quantity).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{Number(order.subtotal || 0).toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span>₹{Number(order.shipping_charge || 0).toFixed(0)}</span>
            </div>
            {Number(order.tax_amount || 0) > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span>₹{Number(order.tax_amount || 0).toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span>₹{Number(order.total_amount || 0).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}