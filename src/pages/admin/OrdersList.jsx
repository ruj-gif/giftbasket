import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.orders.getAll();
      if (response.success) {
        setOrders(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (row) => <span className="font-mono text-xs">{row.id.slice(0, 8)}</span>,
    },
    { key: 'customer_name', label: 'Customer' },
    {
      key: 'total_amount',
      label: 'Total',
      render: (row) => `₹${Number(row.total_amount || 0).toFixed(0)}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          row.status === 'completed' ? 'bg-green-100 text-green-800' :
          row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Orders</h1>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        actions={{
          view: (row) => `/admin/orders/${row.id}`,
        }}
        emptyMessage="No orders found."
      />
    </div>
  );
}