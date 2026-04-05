import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { categories } from "../../data/categories";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) loadProduct();
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
      console.error(err);
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
        description, // ✅ IMPORTANT
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      };

      if (id) {
  await api.products.update(id, payload, imageFile);
} else {
  await api.products.create(payload, imageFile);
}

// ✅ redirect to products list
navigate("/admin/products");

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <h2 className="text-xl text-center">
          {id ? "Edit Product" : "Add Product"}
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full p-3 border rounded"
          required
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded"
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

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border rounded"
        />

        {existingImage && (
          <img
            src={existingImage}
            alt=""
            className="w-24 h-24 object-cover"
          />
        )}

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}