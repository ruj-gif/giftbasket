import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.products.getAll();
      if (response.success) {
        setProducts(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete product "${product.name}"?`)) return;

    try {
      await api.products.delete(product.id);
      loadProducts();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <img
          src={row.image || row.image_url || "/placeholder.png"} // ✅ fallback added
          alt={row.name}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    {
      key: 'price',
      label: 'Price',
      render: (row) => `₹${Number(row.price || 0).toFixed(0)}`,
    },
    {
      key: 'published',
      label: 'Status',
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.published !== false
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.published !== false ? 'Published' : 'Draft'}
        </span>
      ),
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Products
        </h1>

        <Link
          to="/admin/products/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-secondary rounded-lg hover:bg-primary-dark text-sm sm:text-base"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Product</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={products}
        actions={{
          edit: (row) => `/admin/products/${row.id}`,
          delete: handleDelete,
        }}
        emptyMessage="No products found. Add your first product!"
      />
    </div>
  );
}