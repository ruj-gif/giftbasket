import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext"; // ✅ ADDED
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [openCategory, setOpenCategory] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist(); // ✅ ADDED
  const navigate = useNavigate();

  const [addedMap, setAddedMap] = useState({});

  // ================= LOAD DATA =================
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await api.products.getAllSimple();
    if (res.success) {
      setProducts(res.data);
      setFiltered(res.data);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const res = await api.categories.getAll();
    if (res.success) {
      setCategories(res.data);
    }
  };

  // ================= FILTER =================
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
    setMessage(data.length === 0 ? "Coming Soon" : "");
  };

  // ================= ADD TO CART =================
  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedMap((prev) => ({
      ...prev,
      [product.id]: "added",
    }));

    setTimeout(() => {
      setAddedMap((prev) => ({
        ...prev,
        [product.id]: "view",
      }));
    }, 1200);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fafafa]">

      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-white p-4 border-r border-stone-200">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Categories
        </h2>

        {categories
          .filter((cat) => !cat.parent_id)
          .map((parent) => (
            <div key={parent.id} className="mb-2">

              <div
                onClick={() =>
                  setOpenCategory(
                    openCategory === parent.id ? "" : parent.id
                  )
                }
                className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <span>{parent.name}</span>
                <span>{openCategory === parent.id ? "−" : "+"}</span>
              </div>

              {openCategory === parent.id && (
                <div className="ml-4 mt-2 space-y-1">
                  {categories
                    .filter((c) => c.parent_id === parent.id)
                    .map((child) => (
                      <div
                        key={child.id}
                        onClick={() => handleFilter(child.name)}
                        className="cursor-pointer text-sm text-gray-600 hover:text-black"
                      >
                        {child.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* MAIN */}
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

        {/* LOADING */}
        {loading && <p className="text-center">Loading...</p>}

        {/* EMPTY */}
        {!loading && message && (
          <p className="text-center text-gray-500">{message}</p>
        )}

        {/* PRODUCTS */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {filtered.map((product) => {
              const status = addedMap[product.id] || "idle";

              return (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg p-4 shadow-sm relative"
                >
                  {/* ✅ WISHLIST BUTTON */}
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
                  >
                    ♡
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-3 rounded"
                  />

                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    ₹{product.price}
                  </p>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={() => {
                      if (status === "view") {
                        navigate("/cart");
                      } else {
                        handleAddToCart(product);
                      }
                    }}
                    className={`w-full py-2 rounded text-white ${
                      status === "idle"
                        ? "bg-black"
                        : "bg-green-600"
                    }`}
                  >
                    {status === "idle" && "Add to Cart"}
                    {status === "added" && "Added"}
                    {status === "view" && "View Cart →"}
                  </button>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}