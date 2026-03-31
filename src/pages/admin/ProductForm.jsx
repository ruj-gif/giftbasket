import React, { useState } from "react";
import { api } from "../../lib/api";
import { categories } from "../../data/categories";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(""); // ✅ added
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select image ❌");
      return;
    }

    try {
      setLoading(true);

      await api.products.create( // ✅ FIXED
        {
          name,
          price,
          category,
          description, // ✅ added
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        },
        imageFile
      );

      alert("Product added ✅");

      // reset form
      setName("");
      setPrice("");
      setCategory("");
      setDescription(""); // ✅ reset
      setImageFile(null);

    } catch (err) {
      console.error(err);
      alert(err.message || "Error adding product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center italic">
          Add New Product
        </h2>

        {/* NAME */}
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        {/* PRICE */}
        <input
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
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

        {/* ✅ DESCRIPTION */}
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
          rows="4"
          required
        />

        {/* IMAGE */}
        <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center hover:border-red-400 transition">
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">
            Upload product image
          </p>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-black text-white font-medium tracking-wide
          hover:bg-red-500 transition-all duration-300 shadow-md hover:scale-[1.02]"
        >
          {loading ? "Adding..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}