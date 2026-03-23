import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import FileUpload from '../../components/FileUpload';

export default function PaymentSettingsPage() {
  const [formData, setFormData] = useState({
    upi_qr_code_url: '',
    upi_number: '',
    instructions: '',
    is_active: false,
  });
  const [loading, setLoading] = useState(false);
  const [settingsId, setSettingsId] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await api.payment_settings.getAll();
      if (response.success && response.data && response.data.length > 0) {
        const settings = response.data[0];
        setSettingsId(settings.id);
        setFormData({
          upi_qr_code_url: settings.upi_qr_code_url || '',
          upi_number: settings.upi_number || '',
          instructions: settings.instructions || '',
          is_active: settings.is_active || false,
        });
      }
    } catch (error) {
      console.error('Failed to load payment settings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = settingsId
        ? await api.payment_settings.update(settingsId, formData)
        : await api.payment_settings.create(formData);

      if (response.success) {
        alert('Payment settings saved successfully!');
        loadSettings();
      } else {
        alert('Failed to save payment settings');
      }
    } catch (error) {
      alert(error.message || 'Failed to save payment settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6">
        <div>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Enable UPI Payment</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">UPI QR Code Image URL or Upload</label>
          <input
            type="url"
            name="upi_qr_code_url"
            value={formData.upi_qr_code_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
          />
          <FileUpload
            currentUrl={formData.upi_qr_code_url}
            onUploadSuccess={(url) => setFormData({ ...formData, upi_qr_code_url: url })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID / Number</label>
          <input
            type="text"
            name="upi_number"
            value={formData.upi_number}
            onChange={handleChange}
            placeholder="example@paytm"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={4}
            placeholder="Enter payment instructions for customers..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark font-semibold disabled:opacity-50 touch-manipulation"
          >
            {loading ? 'Saving...' : 'Save Payment Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}