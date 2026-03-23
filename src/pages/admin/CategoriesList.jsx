import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '../../lib/api';
import DataTable from '../../components/admin/DataTable';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.categories.getAll();
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;

    try {
      await api.categories.delete(category.id);
      loadCategories();
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Categories</h1>
        <Link to="/admin/categories/new" className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark text-sm sm:text-base touch-manipulation shrink-0">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add Category</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        actions={{
          edit: (row) => `/admin/categories/${row.id}`,
          delete: handleDelete,
        }}
        emptyMessage="No categories found. Add your first category!"
      />
    </div>
  );
}