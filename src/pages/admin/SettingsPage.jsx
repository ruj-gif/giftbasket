import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { useSettings } from "../../contexts/SettingsContext";

function SettingsPage() {
  const { settings, loadSettings } = useSettings();

  const [formData, setFormData] = useState({
    site_name: "",
    logo: "",
    hero_title: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        site_name: settings.site_name || "",
        logo: settings.logo || "",
        hero_title: settings.hero_title || "",
        email: settings.email || "",
        phone: settings.phone || "",
        address: settings.address || "",
        city: settings.city || "",
        pincode: settings.pincode || "",
        whatsapp: settings.whatsapp || "",
        instagram: settings.instagram || "",
        facebook: settings.facebook || "",
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.settings.update(formData);

      if (res.success) {
        await loadSettings();
        alert("Settings saved!");
      } else {
        alert("Failed to save settings");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  if (settings === null) {
    return <div className="p-6">Loading settings...</div>;
  }

  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">

        {/* BASIC */}
        <div>
          <label className="block mb-2">Site Name</label>
          <input
            type="text"
            name="site_name"
            value={formData.site_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Hero Title</label>
          <input
            type="text"
            name="hero_title"
            value={formData.hero_title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* CONTACT INFO */}
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* SOCIAL */}
        <div>
          <label className="block mb-2">Youtube</label>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Instagram</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;