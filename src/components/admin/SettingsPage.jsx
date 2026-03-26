import React, { useState, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

export default function SettingsPage() {
  const { settings, loadSettings } = useSettings();
  const [formData, setFormData] = useState({
    siteName: '',
    phone: '',
    email: '',
    address: ''
  });
  const [saving, setSaving] = useState(false);

  // Load existing settings into the form
  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || ''
      });
    }
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Save to LocalStorage
      localStorage.setItem('my_settings', JSON.stringify(formData));
      // Tell the rest of the app to update
      await loadSettings();
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-black uppercase tracking-tighter mb-8 text-black">Store Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border rounded-3xl shadow-sm">
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Store Name</label>
          <input 
            type="text"
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
            value={formData.siteName}
            onChange={(e) => setFormData({...formData, siteName: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">WhatsApp Number (e.g. 919876543210)</label>
          <input 
            type="text"
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Store Address</label>
          <textarea 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
            rows="3"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <button 
          disabled={saving}
          type="submit"
          className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}