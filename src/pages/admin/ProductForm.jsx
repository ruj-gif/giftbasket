import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { categories } from "../../data/categories";

export default function ProductForm() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOAD PRODUCT (EDIT MODE)
  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await api.products.getById(id);

      if (!res.success) {
        alert("Failed to load product");
        return;
      }

      const product = res.data;

      setName(product.name || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
      setExistingImage(product.image || "");
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name,
        price,
        category,
        description,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      };

      if (id) {
        // ✅ UPDATE (IMPORTANT FIX)
        await api.products.update(id, payload, imageFile);
        alert("Product updated ✅");
      } else {
        // ✅ CREATE
        await api.products.create(payload, imageFile);
        alert("Product added ✅");
      }

    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(err.message || "Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 md:p-8 rounded-3xl shadow-xl space-y-5"
      >
        <h2 className="text-xl md:text-2xl text-center italic">
          {id ? "Edit Product" : "Add New Product"}
        </h2>

        {/* NAME */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full p-3 border rounded-xl"
          required
        />

        {/* PRICE */}
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded-xl"
          required
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-xl"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <React.Fragment key={cat.name}>
              <option value={cat.name}>{cat.name}</option>
              {cat.sub.map((sub) => (
                <option key={sub} value={sub}>
                  — {sub}
                </option>
              ))}
            </React.Fragment>
          ))}
        </select>

        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border rounded-xl"
          rows="4"
          required
        />

        {/* EXISTING IMAGE */}
        {existingImage && (
          <img
            src={existingImage}
            alt="Product"
            className="w-32 h-32 object-cover rounded-xl mx-auto"
          />
        )}

        {/* FILE INPUT */}
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-full"
        >
          {loading ? "Saving..." : id ? "Update Product" : "Save Product"}
        </button>
      </form>
    </div>
  );
}