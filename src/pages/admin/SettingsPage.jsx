import React, { useState, useEffect, useContext } from 'react';
import { api } from '../../lib/api';
import { SettingsContext } from '../../contexts/SettingsContext';
import FileUpload from '../../components/FileUpload';

export default function SettingsPage() {
  const { settings, loadSettings } = useContext(SettingsContext);
  const [formData, setFormData] = useState({
    site_name: '',
    site_logo: '',
    contact_phone: '',
    contact_email: '',
    social_facebook: '',
    social_x: '',
    social_instagram: '',
    social_linkedin: '',
    social_youtube: '',
    address: '',
    shipping_charge: '',
    tax_rate: '',
    tax_name: '',
    free_shipping_threshold: '',
  });
  const [loading, setLoading] = useState(false);
  const [settingsId, setSettingsId] = useState(null);

  useEffect(() => {
    if (settings && settings.id) {
      setSettingsId(settings.id);
      setFormData({
        site_name: settings.site_name || '',
        site_logo: settings.site_logo || '',
        contact_phone: settings.contact_phone || '',
        contact_email: settings.contact_email || '',
        social_facebook: settings.social_facebook || '',
        social_x: settings.social_x || '',
        social_instagram: settings.social_instagram || '',
        social_linkedin: settings.social_linkedin || '',
        social_youtube: settings.social_youtube || '',
        address: settings.address || '',
        shipping_charge: settings.shipping_charge || '',
        tax_rate: settings.tax_rate || '',
        tax_name: settings.tax_name || '',
        free_shipping_threshold: settings.free_shipping_threshold || '',
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = settingsId
        ? await api.settings.update(settingsId, formData)
        : await api.settings.create(formData);

      if (response.success) {
        await loadSettings();
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      alert(error.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Site Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name *</label>
          <input
            type="text"
            name="site_name"
            value={formData.site_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Logo URL or Upload</label>
          <input
            type="url"
            name="site_logo"
            value={formData.site_logo}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
          />
          <FileUpload
            currentUrl={formData.site_logo}
            onUploadSuccess={(url) => setFormData({ ...formData, site_logo: url })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
          <div className="space-y-4">
            {['facebook', 'x', 'instagram', 'linkedin', 'youtube'].map((platform) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{platform}</label>
                <input
                  type="url"
                  name={`social_${platform}`}
                  value={formData[`social_${platform}`]}
                  onChange={handleChange}
                  placeholder={`https://${platform}.com/...`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Tax Settings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Charge (₹)</label>
              <input
                type="number"
                name="shipping_charge"
                value={formData.shipping_charge}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                name="free_shipping_threshold"
                value={formData.free_shipping_threshold}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Name (e.g., GST)</label>
              <input
                type="text"
                name="tax_name"
                value={formData.tax_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                name="tax_rate"
                value={formData.tax_rate}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark font-semibold disabled:opacity-50 touch-manipulation"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}