import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import FileUpload from '../../components/FileUpload';

export default function HeroSectionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Set default values specifically for Gift Basket branding
  const [formData, setFormData] = useState({
    title: 'Gift Basket', // cite: 1
    subtitle: 'The magic touch with emotions. Established in 2017, we specialize in unique and personalized gift baskets for every occasion.', // cite: 4, Logo PNG C.jpg
    cta_text: 'Shop Personalized Gifts',
    cta_link: '/products?category=personalised-gifts',
    background_image_url: '',
    published: true,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) loadSection();
  }, [id]);

  const loadSection = async () => {
    try {
      const response = await api.hero_sections.getById(id);
      if (response.success) {
        const section = response.data;
        setFormData({
          title: section.title || '',
          subtitle: section.subtitle || '',
          cta_text: section.cta_text || '',
          cta_link: section.cta_link || '',
          background_image_url: section.background_image_url || '',
          published: section.published !== false,
        });
      }
    } catch (error) {
      console.error('Failed to load hero section:', error);
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
      const response = id ? await api.hero_sections.update(id, formData) : await api.hero_sections.create(formData);
      if (response.success) {
        navigate('/admin/hero-sections');
      } else {
        alert('Failed to save hero section');
      }
    } catch (error) {
      alert(error.message || 'Failed to save hero section');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        {id ? 'Edit Gift Basket Hero' : 'Create Gift Basket Hero'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Title (e.g., Gift Basket)</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter brand name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tagline & Summary</label>
          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="The magic touch with emotions..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="mt-2 text-xs text-gray-500 italic">Tip: Include your "Established in 2017" and "Family-owned" details here to build trust. [cite: 4, 5]</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
            <input
              type="text"
              name="cta_text"
              value={formData.cta_text}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Button Link (URL)</label>
            <input
              type="text"
              name="cta_link"
              value={formData.cta_link}
              onChange={handleChange}
              placeholder="/shop or /corporate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
          <FileUpload
            currentUrl={formData.background_image_url}
            onUploadSuccess={(url) => setFormData({ ...formData, background_image_url: url })}
          />
          <input
            type="hidden"
            name="background_image_url"
            value={formData.background_image_url}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
           <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Set as Active Hero Section</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-colors disabled:opacity-50 shadow-md"
          >
            {loading ? 'Saving...' : id ? 'Update Website Banner' : 'Publish Banner'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/hero-sections')}
            className="w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-semibold transition-colors"
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
}