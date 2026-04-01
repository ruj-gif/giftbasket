import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { useSettings } from "../../contexts/SettingsContext";

export default function SettingsPage() {
  const { settings, loadSettings } = useSettings();

  const [formData, setFormData] = useState({
    site_name: "",
    logo: "",
    hero_title: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Load settings into form
  useEffect(() => {
    if (settings) {
      setFormData({
        site_name: settings.site_name || "",
        logo: settings.logo || "",
        hero_title: settings.hero_title || "",
      });
    }
  }, [settings]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit (update only)
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

  // ✅ Loading state
  if (settings === null) {
  return <div className="p-6">Loading settings...</div>;
}
  return (
    <div className="max-w-3xl w-full">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        {/* Site Name */}
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

        {/* Logo */}
        <div>
          <label className="block mb-2">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://your-logo-url.com"
          />
        </div>

        {/* Hero Title */}
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

        {/* Submit */}
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