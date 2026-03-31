import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import FileUpload from '../../components/FileUpload';

export default function HeroSectionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ FIXED: use "image" instead of background_image_url
  const [formData, setFormData] = useState({
    title: 'Gift Basket',
    subtitle:
      'The magic touch with emotions. Established in 2017, we specialize in unique and personalized gift baskets.',
    cta_text: 'Shop Personalized Gifts',
    cta_link: '/products?category=personalised-gifts',
    image: '', // ✅ FIXED
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);

  useEffect(() => {
    if (id) {
      loadSection();
    }
  }, [id]);

  // ✅ LOAD DATA
  const loadSection = async () => {
    setFetching(true);
    try {
      const response = await api.hero_sections.getById(id);

      if (response.success && response.data) {
        const section = response.data;

        setFormData({
          title: section.title || '',
          subtitle: section.subtitle || '',
          cta_text: section.cta_text || '',
          cta_link: section.cta_link || '',
          image: section.image || '', // ✅ FIXED
          published: section.published !== false,
        });
      }
    } catch (error) {
      console.error('Failed to load hero:', error);
    } finally {
      setFetching(false);
    }
  };

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = id
        ? await api.hero_sections.update(id, formData)
        : await api.hero_sections.create(formData);

      if (response.success) {
        navigate('/admin/hero-sections');
      } else {
        alert(response.error || 'Failed to save');
      }
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Hero Section' : 'Create Hero Section'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* TITLE */}
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* SUBTITLE */}
        <div>
          <label className="block mb-2 font-medium">Subtitle</label>
          <textarea
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            rows={4}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* CTA */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">CTA Text</label>
            <input
              type="text"
              name="cta_text"
              value={formData.cta_text}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">CTA Link</label>
            <input
              type="text"
              name="cta_link"
              value={formData.cta_link}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-2 font-medium">Hero Image</label>

          <FileUpload
            currentUrl={formData.image} // ✅ FIXED
            onUploadSuccess={(url) =>
              setFormData((prev) => ({
                ...prev,
                image: url, // ✅ FIXED
              }))
            }
          />
        </div>

        {/* PUBLISHED */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          <label>Published</label>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/hero-sections')}
            className="bg-gray-300 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}