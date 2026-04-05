import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // ✅ search
  const [search, setSearch] = useState("");

  const LIMIT = 10;

  useEffect(() => {
    loadProducts();
  }, [page, search]); // ✅ reload on search + page

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await api.products.getAll(page, LIMIT, search);

      if (response.success) {
        setProducts(response.data || []);
        setTotal(response.total || 0);
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

  const totalPages = Math.ceil(total / LIMIT);

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <img
          src={row.image || row.image_url || "/placeholder.png"}
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
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Products
        </h1>

        <Link
          to="/admin/products/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 text-sm sm:text-base"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Product</span>
        </Link>
      </div>

      {/* ✅ SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // ✅ reset page when searching
          }}
          className="w-full sm:w-72 px-4 py-2 border rounded"
        />
      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={products}
        actions={{
          edit: (row) => `/admin/products/${row.id}`,
          delete: handleDelete,
        }}
        emptyMessage="No products found. Add your first product!"
      />

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm font-medium">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}