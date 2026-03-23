import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) loadCategory();
  }, [id]);

  const loadCategory = async () => {
    try {
      const response = await api.categories.getById(id);
      if (response.success) {
        const category = response.data;
        setFormData({
          name: category.name || '',
          slug: category.slug || '',
        });
      }
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'name' && !id) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = id ? await api.categories.update(id, formData) : await api.categories.create(formData);

      if (response.success) {
        navigate('/admin/categories');
      } else {
        alert('Failed to save category');
      }
    } catch (error) {
      alert(error.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        {id ? 'Edit Category' : 'Add New Category'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark font-semibold disabled:opacity-50 touch-manipulation"
          >
            {loading ? 'Saving...' : id ? 'Update Category' : 'Create Category'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold touch-manipulation"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}