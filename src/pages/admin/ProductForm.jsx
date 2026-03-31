import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { categories } from "../../data/categories";

export default function ProductForm() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
<<<<<<< HEAD
  const [description, setDescription] = useState(""); // ✅ added
=======
  const [description, setDescription] = useState("");
>>>>>>> 6bc94c07c9742c9e814d68ae8c0f13866909357c
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

<<<<<<< HEAD
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
=======
      const payload = {
        name,
        price,
        category,
        description,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      };
>>>>>>> 6bc94c07c9742c9e814d68ae8c0f13866909357c

      if (id) {
        // ✅ UPDATE (IMPORTANT FIX)
        await api.products.update(id, payload, imageFile);
        alert("Product updated ✅");
      } else {
        // ✅ CREATE
        await api.products.create(payload, imageFile);
        alert("Product added ✅");
      }

<<<<<<< HEAD
      // reset form
      setName("");
      setPrice("");
      setCategory("");
      setDescription(""); // ✅ reset
      setImageFile(null);

    } catch (err) {
      console.error(err);
      alert(err.message || "Error adding product ❌");
=======
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(err.message || "Error ❌");
>>>>>>> 6bc94c07c9742c9e814d68ae8c0f13866909357c
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
<<<<<<< HEAD
        <h2 className="text-2xl font-semibold text-center italic">
          Add New Product
=======
        <h2 className="text-xl md:text-2xl text-center italic">
          {id ? "Edit Product" : "Add New Product"}
>>>>>>> 6bc94c07c9742c9e814d68ae8c0f13866909357c
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

<<<<<<< HEAD
        {/* ✅ DESCRIPTION */}
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
=======
        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border rounded-xl"
>>>>>>> 6bc94c07c9742c9e814d68ae8c0f13866909357c
          rows="4"
          required
        />

<<<<<<< HEAD
        {/* IMAGE */}
        <div className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center hover:border-red-400 transition">
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full cursor-pointer"
=======
        {/* EXISTING IMAGE */}
        {existingImage && (
          <img
            src={existingImage}
            alt="Product"
            className="w-32 h-32 object-cover rounded-xl mx-auto"
>>>>>>> 6bc94c07c9742c9e814d68ae8c0f13866909357c
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
<<<<<<< HEAD
          className="w-full py-3 rounded-full bg-black text-white font-medium tracking-wide
          hover:bg-red-500 transition-all duration-300 shadow-md hover:scale-[1.02]"
=======
          className="w-full py-3 bg-black text-white rounded-full"
>>>>>>> 6bc94c07c9742c9e814d68ae8c0f13866909357c
        >
          {loading ? "Saving..." : id ? "Update Product" : "Save Product"}
        </button>
      </form>
    </div>
  );
}