import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import FileUpload from '../../components/FileUpload';

export default function HeroSectionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial state with your "Gift Basket" branding defaults
  const [formData, setFormData] = useState({
    title: 'Gift Basket',
    subtitle: 'The magic touch with emotions. Established in 2017, we specialize in unique and personalized gift baskets for every occasion in Kolkata.',
    cta_text: 'Shop Personalized Gifts',
    cta_link: '/products?category=personalised-gifts',
    background_image_url: '',
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);

  useEffect(() => {
    if (id) {
      loadSection();
    }
  }, [id]);

  const loadSection = async () => {
    setFetching(true);
    try {
      const response = await api.hero_sections.getById(id);
      if (response.success && response.data) {
        const section = response.data;
        setFormData({
          title: section.title || 'Gift Basket',
          subtitle: section.subtitle || '',
          cta_text: section.cta_text || 'Shop Now',
          cta_link: section.cta_link || '/shop',
          background_image_url: section.background_image_url || '',
          published: section.published !== false,
        });
      }
    } catch (error) {
      console.error('Failed to load hero section from central backend:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // This sends the data to your Qobo Central Backend using your API Key
      const response = id 
        ? await api.hero_sections.update(id, formData) 
        : await api.hero_sections.create(formData);

      if (response.success) {
        // After saving, return to the list to see the update live
        navigate('/admin/hero-sections');
      } else {
        alert(`Error: ${response.error || 'Failed to save to backend'}`);
      }
    } catch (error) {
      alert(error.message || 'Connection to central backend failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center">Loading your branding data...</div>;

  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {id ? 'Update Gift Basket Banner' : 'Create New Shop Banner'}
        </h1>
        <p className="text-gray-600">Manage your "About Us" and Hero messaging for the Kolkata storefront.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-8">
        {/* Title Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Subtitle / About Us Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline & "About Us" Summary</label>
          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            rows={5}
            placeholder="Tell your story... e.g., Family-owned business established in 2017..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          />
          <p className="mt-2 text-xs text-gray-400">This appears as the main description on your homepage.</p>
        </div>

        {/* Call to Action Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Button Label</label>
            <input
              type="text"
              name="cta_text"
              value={formData.cta_text}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Button Link (e.g., /shop)</label>
            <input
              type="text"
              name="cta_link"
              value={formData.cta_link}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Visuals */}
        <div className="border-t border-gray-100 pt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-4">Background Image</label>
          <FileUpload
            currentUrl={formData.background_image_url}
            onUploadSuccess={(url) => setFormData({ ...formData, background_image_url: url })}
          />
        </div>

        {/* Status Toggle */}
        <div className="flex items-center p-4 bg-red-50 rounded-lg border border-red-100">
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
          />
          <label htmlFor="published" className="ml-3 text-sm font-bold text-red-800 cursor-pointer">
            Make this the active homepage banner
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Connecting to Qobo...' : id ? 'Save Changes' : 'Publish to Live Site'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/hero-sections')}
            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}