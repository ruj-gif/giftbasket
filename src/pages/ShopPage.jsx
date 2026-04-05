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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    const loadCategories = async () => {
      try {
        const res = await api.categories.getAll();

        if (res.success) {
          setCategories(res.data || []);
        }
      } catch (err) {
        console.error("CATEGORY ERROR:", err);
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  const mainCategories = categories.filter((c) => !c.parent_id);
  const subCategories = categories.filter((c) => c.parent_id);

  // ✅ FIXED FILTER (MAIN + SUBCATEGORY SUPPORT)
  const handleFilter = (category, searchText = search) => {
    setActiveCategory(category);

    let data = products;

    if (category) {
      // find subcategories of selected main category
      const childSubs = subCategories
        .filter((sub) => {
          const parent = mainCategories.find(
            (m) => m.id === sub.parent_id
          );
          return parent && parent.name === category;
        })
        .map((sub) => sub.name.toLowerCase());

      data = data.filter((p) => {
        const productCat = p.category?.toLowerCase();

        return (
          productCat === category.toLowerCase() ||
          childSubs.includes(productCat)
        );
      });
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

      {/* SIDEBAR */}
      <div className="w-full md:w-64 shrink-0 bg-[#fdfdfd] p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-stone-200">
        <h2 className="text-2xl font-serif italic text-stone-900 mb-6 border-b border-stone-200 pb-2">
          Categories
        </h2>

        {mainCategories.map((cat) => (
          <div key={cat.id} className="mb-2">

            <div
              onClick={() => {
                setOpenCategory(openCategory === cat.id ? "" : cat.id);
                handleFilter(cat.name);
              }}
              className={`flex justify-between items-center cursor-pointer p-3 border-l-2 text-sm uppercase tracking-wider
              ${activeCategory === cat.name ? "bg-stone-100 border-stone-900 font-medium text-stone-900" : "border-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`}
            >
              <span>{cat.name}</span>
              {subCategories.some(sub => sub.parent_id === cat.id) && <span>+</span>}
            </div>

            {openCategory === cat.id && (
              <div className="ml-4 mt-2 space-y-1">
                {subCategories
                  .filter((sub) => sub.parent_id === cat.id)
                  .map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => handleFilter(sub.name)}
                      className={`cursor-pointer p-2 pl-4 text-xs uppercase tracking-wider border-l-2
                      ${activeCategory === sub.name ? "bg-stone-100 border-stone-400 font-medium text-stone-900" : "border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-800"}`}
                    >
                      — {sub.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-4 mb-8 border border-stone-200 bg-white text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleFilter(activeCategory, e.target.value);
          }}
        />

        {loading && (
          <p className="text-center text-stone-500 mt-10">
            Loading products...
          </p>
        )}

        {!loading && message && (
          <p className="text-center text-stone-500 text-lg mb-6">
            {message}
          </p>
        )}

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