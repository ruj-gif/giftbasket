import React, { useEffect, useState } from "react";
import { api, saveFavourite } from "../lib/api";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ CATEGORIES
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
    {
      name: "Ready-to-get Gifts",
      sub: ["Show Pieces", "Mycological Gifts", "Mugs", "Handicrafts"],
    },
    { name: "Gifts for Kids" },
    { name: "Trophies and Mementos" },
    { name: "Handicraft Items" },
    { name: "Home Decor" },
    { name: "Chocolate & Hampers" },
    { name: "Islamic Gifts" },
    { name: "Personalise Sticker & Badges" },
  ];

  // ✅ LOAD PRODUCTS
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await api.getProducts();
    setProducts(data || []);
    setFiltered(data || []);
  };

  // ✅ FILTER FUNCTION
  const handleFilter = (category, searchText = search) => {
    let data = products;

    if (category) {
      data = data.filter(
        (p) =>
          (p.category &&
            p.category.toLowerCase().includes(category.toLowerCase())) ||
          (p.subcategory &&
            p.subcategory.toLowerCase().includes(category.toLowerCase()))
      );
    }

    if (searchText) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFiltered(data);
  };

  // 🛒 ADD TO CART
  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart 🛒`);
  };

  // ❤️ FAVOURITE
  const toggleFavourite = async (product) => {
    await saveFavourite(product);

    const isFav = favourites.includes(product.id);

    setFavourites((prev) =>
      isFav
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );

    alert(
      isFav
        ? `${product.name} removed from favourites`
        : `${product.name} added to favourites ❤️`
    );
  };

  return (
    <div className="flex">

      {/* ================= SIDEBAR ================= */}
      <div className="w-72 p-6 border-r h-screen overflow-y-auto">

        <h2 className="text-xl mb-4 font-semibold">Categories</h2>

        {categories.map((cat, index) => (
          <div key={index} className="mb-2">

            {/* MAIN CATEGORY */}
            <div
              onClick={() => {
                const isOpen = openCategory === cat.name;
                setOpenCategory(isOpen ? null : cat.name);
                handleFilter(cat.name);
              }}
              className={`flex justify-between items-center cursor-pointer px-3 py-2 rounded-lg transition ${
                openCategory === cat.name
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{cat.name}</span>

              {cat.sub && (
                <span>
                  {openCategory === cat.name ? "−" : "+"}
                </span>
              )}
            </div>

            {/* SUBCATEGORY */}
            {cat.sub && openCategory === cat.name && (
              <div className="ml-3 mt-2 max-h-40 overflow-y-auto border rounded-lg p-2 space-y-2 bg-gray-50">
                {cat.sub.map((sub, i) => (
                  <p
                    key={i}
                    onClick={() => handleFilter(sub)}
                    className="cursor-pointer text-gray-600 hover:text-black px-2 py-1 rounded hover:bg-gray-200"
                  >
                    {sub}
                  </p>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="flex-1 p-8">

        {/* 🔍 SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilter(openCategory, e.target.value);
            }}
            className="w-full border px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filtered.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 hover:shadow-lg transition group"
            >
              {/* IMAGE */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* INFO */}
              <h3 className="mt-3 font-semibold">{product.name}</h3>
              <p className="text-gray-500">₹{product.price}</p>

              {/* ACTIONS */}
              <div className="flex justify-between mt-3 text-lg">

                {/* CART */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="hover:scale-110 transition"
                >
                  🛒
                </button>

                {/* FAV */}
                <button
                  onClick={() => toggleFavourite(product)}
                  className={`transition text-xl ${
                    favourites.includes(product.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  ❤️
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}