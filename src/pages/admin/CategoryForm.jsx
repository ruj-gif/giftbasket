import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { supabase } from "../../lib/supabase";

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);

  // ✅ LOAD DATA
  useEffect(() => {
    loadCategories();
    if (id) loadCategory();
  }, [id]);

  // ✅ LOAD ALL CATEGORIES
  const loadCategories = async () => {
    try {
      const res = await api.categories.getAll();
      if (res.success) {
        setCategories(res.data || []);
      }
    } catch (err) {
      console.error("CATEGORY LOAD ERROR:", err);
    }
  };

  // ✅ LOAD SINGLE CATEGORY (EDIT)
  const loadCategory = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setFormData({
        name: data.name || "",
        slug: data.slug || "",
      });

      setParentId(data.parent_id || "");
    } catch (error) {
      console.error("Failed to load category:", error);
    }
  };

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      setFormData({
        name: value,
        slug: id ? formData.slug : slug, // don't overwrite slug in edit
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        parent_id: parentId || null,
      };

      const response = id
        ? await api.categories.update(id, payload)
        : await api.categories.create(payload);

      if (response.success) {
        navigate("/admin/categories");
      } else {
        alert("Failed to save category");
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        {id ? "Edit Category" : "Add New Category"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6"
      >
        {/* ✅ PARENT CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parent Category
          </label>

          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Main Category</option>

            {categories
              .filter((cat) => !cat.parent_id && cat.id !== id) // ✅ FIX
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : id
              ? "Update Category"
              : "Create Category"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}