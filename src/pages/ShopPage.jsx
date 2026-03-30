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
  const [loading, setLoading] = useState(true);

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
  ];

  // ✅ LOAD PRODUCTS (FIXED)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.products.getAll();

        if (response.success) {
          // ✅ ONLY SHOW PUBLISHED
          const publishedProducts = response.data.filter(
            (p) => p.published !== false
          );

          setProducts(publishedProducts);
          setFiltered(publishedProducts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ✅ FILTER FUNCTION
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
        p.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFiltered(data);
    setMessage(data.length === 0 ? "Coming Soon 🚀" : "");
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa] font-sans">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-[#fdfdfd] p-4 overflow-y-auto border-r border-stone-200">
        <h2 className="text-2xl font-serif italic text-stone-900 mb-6 border-b border-stone-200 pb-2">Categories</h2>

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
              className={`flex justify-between items-center cursor-pointer p-3 rounded-none transition-colors border-l-2 text-sm uppercase tracking-wider
              ${activeCategory === cat.name ? "bg-stone-100 border-stone-900 font-medium text-stone-900" : "border-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`}
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
                    className={`cursor-pointer p-2 pl-4 rounded-none text-xs uppercase tracking-wider transition-colors border-l-2
                    ${activeCategory === sub ? "bg-stone-100 border-stone-400 font-medium text-stone-900" : "border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-800"}`}
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
          className="w-full p-4 mb-8 border border-stone-200 rounded-none bg-white font-sans text-sm focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all shadow-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleFilter(activeCategory, e.target.value);
          }}
        />

        {/* LOADING */}
        {loading && (
          <p className="text-center text-stone-500 uppercase tracking-widest text-sm mt-10">Loading products...</p>
        )}

        {/* MESSAGE */}
        {!loading && message && (
          <p className="text-center text-stone-500 text-lg mb-6 font-serif italic">
            {message}
          </p>
        )}

        {/* PRODUCTS */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}