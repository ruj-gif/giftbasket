import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ FROM DB
  const [activeCategory, setActiveCategory] = useState("");
  const [openCategory, setOpenCategory] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ LOAD DATA
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.products.getAllSimple();
      if (response.success) {
        setProducts(response.data);
        setFiltered(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOAD CATEGORIES FROM DB
  const loadCategories = async () => {
    try {
      const res = await api.categories.getAll();
      if (res.success) {
        setCategories(res.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ GROUP INTO PARENT + CHILD (LIKE YOUR OLD STRUCTURE)
  const groupedCategories = categories
    .filter((cat) => !cat.parent_id)
    .map((parent) => ({
      name: parent.name,
      sub: categories
        .filter((c) => c.parent_id === parent.id)
        .map((c) => c.name),
    }));

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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fafafa] font-sans">

      {/* 🔥 SIDEBAR */}
      <div className="w-full md:w-64 shrink-0 bg-[#fdfdfd] p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-stone-200">
        <h2 className="text-2xl font-serif italic text-stone-900 mb-6 border-b border-stone-200 pb-2">
          Categories
        </h2>

        {groupedCategories.map((cat, i) => (
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
              className={`flex justify-between items-center cursor-pointer p-3 border-l-2 text-sm uppercase tracking-wider
              ${
                activeCategory === cat.name
                  ? "bg-stone-100 border-stone-900 font-medium text-stone-900"
                  : "border-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              <span>{cat.name}</span>
              {cat.sub.length > 0 && <span>{openCategory === cat.name ? "−" : "+"}</span>}
            </div>

            {/* SUB CATEGORY */}
            {openCategory === cat.name && cat.sub.length > 0 && (
              <div className="ml-4 mt-2 space-y-1 max-h-40 overflow-y-auto">
                {cat.sub.map((sub, j) => (
                  <div
                    key={j}
                    onClick={() => handleFilter(sub)}
                    className={`cursor-pointer p-2 pl-4 text-xs uppercase tracking-wider border-l-2
                    ${
                      activeCategory === sub
                        ? "bg-stone-100 border-stone-400 font-medium text-stone-900"
                        : "border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                    }`}
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
          className="w-full p-4 mb-8 border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 shadow-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleFilter(activeCategory, e.target.value);
          }}
        />

        {/* LOADING */}
        {loading && (
          <p className="text-center text-stone-500 uppercase tracking-widest text-sm mt-10">
            Loading products...
          </p>
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