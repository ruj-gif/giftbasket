import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [openCategory, setOpenCategory] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // ✅ CATEGORY DATA
  const categories = [
    {
      name: "Personalised Gifts",
      sub: [
        "Personalise Mug",
        "Personalise Photo Frame",
        "Personalise Cushion",
        "Personalise Sipper & Bottles",
        "Personalise Fridge Magnet",
        "Personalise T-Shirt",
        "Personalise Engraving Items",
        "Personalise Pen & Diary",
        "Personalise 3D Photos",
        "Others",
      ],
    },
    {
      name: "Gift Hampers",
      sub: [
        "Birthday Hamper",
        "Anniversary Hamper",
        "Welcome Hamper",
        "Occasional Hamper",
        "Others",
      ],
    },
    {
      name: "Corporate Gifts",
      sub: ["Seasonal Gift", "Hampers", "Others"],
    },
    { name: "Ready-to-get Gifts", sub: [] },
    { name: "Gifts for Kids", sub: [] },
    { name: "Trophies and Mementos", sub: [] },
    { name: "Handicraft Items", sub: [] },
    { name: "Home Decor", sub: [] },
    { name: "Chocolate & Hampers", sub: [] },
    { name: "Islamic Gifts", sub: [] },
    { name: "Personalise Sticker & Badges", sub: [] },
  ];

  // ✅ LOAD PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data || []);
        setFiltered(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  // ✅ FILTER
  const handleFilter = (category, searchText = search) => {
    setActiveCategory(category);

    let data = products;

    if (category) {
      data = data.filter((p) =>
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (searchText) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFiltered(data);
    setMessage(data.length === 0 ? "Coming Soon 🚀" : "");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-white p-4 overflow-y-auto border-r">

        <h2 className="text-xl font-semibold mb-4">Categories</h2>

        {categories.map((cat, i) => (
          <div key={i} className="mb-2">

            {/* MAIN CATEGORY */}
            <div
              onClick={() => {
                if (cat.sub.length > 0) {
                  setOpenCategory(openCategory === cat.name ? "" : cat.name);
                } else {
                  handleFilter(cat.name);
                }
              }}
              className={`flex justify-between items-center cursor-pointer p-2 rounded 
              ${activeCategory === cat.name ? "bg-black text-white" : "hover:bg-gray-200"}`}
            >
              <span>{cat.name}</span>
              {cat.sub.length > 0 && <span>+</span>}
            </div>

            {/* SUB CATEGORY */}
            {openCategory === cat.name && cat.sub.length > 0 && (
              <div className="ml-4 mt-2 space-y-1 max-h-40 overflow-y-auto">

                {cat.sub.map((sub, j) => (
                  <div
                    key={j}
                    onClick={() => handleFilter(sub)}
                    className={`cursor-pointer p-1 rounded text-sm
                    ${activeCategory === sub ? "bg-black text-white" : "hover:bg-gray-200"}`}
                  >
                    {sub}
                  </div>
                ))}

              </div>
            )}

          </div>
        ))}
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-3 mb-6 border rounded"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleFilter(activeCategory, e.target.value);
          }}
        />

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-gray-500 text-lg mb-6">
            {message}
          </p>
        )}

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

      </div>
    </div>
  );
}