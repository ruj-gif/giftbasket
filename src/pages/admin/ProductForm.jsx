import React, { useState } from "react";
import { api } from "../../lib/api";
import { categories } from "../../data/categories";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select image ❌");
      return;
    }

    try {
      await api.createProduct(
        {
          name,
          price,
          category, // ✅ combined value
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        },
        imageFile
      );

      alert("Product added ✅");

      setName("");
      setPrice("");
      setCategory("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Error adding product ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* 🔥 CATEGORY + SUBCATEGORY COMBINED */}
     <select value={category} onChange={(e) => setCategory(e.target.value)}>
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

      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <button type="submit">Save</button>
    </form>
  );
}