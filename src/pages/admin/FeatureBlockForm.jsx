import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

export default function FeatureBlockForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Heart',
    display_order: 0,
    published: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) loadFeature();
  }, [id]);

  const loadFeature = async () => {
    try {
      const response = await api.feature_blocks.getById(id);
      if (response.success) {
        const feature = response.data;
        setFormData({
          title: feature.title || '',
          description: feature.description || '',
          icon: feature.icon || 'Heart',
          display_order: feature.display_order || 0,
          published: feature.published !== false,
        });
      }
    } catch (error) {
      console.error('Failed to load feature block:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = id ? await api.feature_blocks.update(id, formData) : await api.feature_blocks.create(formData);

      if (response.success) {
        navigate('/admin/feature-blocks');
      } else {
        alert('Failed to save feature block');
      }
    } catch (error) {
      alert(error.message || 'Failed to save feature block');
    } finally {
      setLoading(false);
    }
  };

  const iconOptions = ['Truck', 'Shield', 'Heart', 'Sparkles'];

  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        {id ? 'Edit Feature Block' : 'Add New Feature Block'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark font-semibold disabled:opacity-50 touch-manipulation"
          >
            {loading ? 'Saving...' : id ? 'Update Feature Block' : 'Create Feature Block'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/feature-blocks')}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold touch-manipulation"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}