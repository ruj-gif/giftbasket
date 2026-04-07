import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
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
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [addedMap, setAddedMap] = useState({});

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
          .map((parent) => {
            const children = categories.filter(
              (c) => c.parent_id === parent.id
            );

            const hasChildren = children.length > 0;

            return (
              <div key={parent.id} className="mb-2">

                <div
                  onClick={() => {
                    if (hasChildren) {
                      setOpenCategory(
                        openCategory === parent.id ? "" : parent.id
                      );
                    } else {
                      handleFilter(parent.name);
                    }
                  }}
                  className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded"
                >
                  <span>{parent.name}</span>

                  {hasChildren && (
                    <span>
                      {openCategory === parent.id ? "−" : "+"}
                    </span>
                  )}
                </div>

                {hasChildren && openCategory === parent.id && (
                  <div className="ml-4 mt-2 space-y-1">
                    {children.map((child) => (
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
            );
          })}
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

        {loading && <p className="text-center">Loading...</p>}

        {!loading && message && (
          <p className="text-center text-gray-500">{message}</p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {filtered.map((product) => {
              const status = addedMap[product.id] || "idle";
              const isWishlisted = wishlist.find(
                (item) => item.id === product.id
              );

              return (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg p-4 shadow-sm relative
                  transform transition-all duration-300
                  hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] group"
                >

                  {/* WISHLIST */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow
                    hover:scale-110 transition z-10"
                  >
                    <span
                      className={`text-lg ${
                        isWishlisted ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      ♥
                    </span>
                  </button>

                  {/* IMAGE */}
                  <div className="overflow-hidden rounded relative z-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-3 rounded
                      transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="font-medium">{product.name}</h3>

                  {/* ✅ DESCRIPTION ADDED */}
                  <p className="text-sm text-gray-500 mb-1">
                    {product.description || "No description available"}
                  </p>

                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    ₹{product.price}
                  </p>

                  {/* CART */}
                  <button
                    onClick={() => {
                      if (status === "view") {
                        navigate("/cart");
                      } else {
                        handleAddToCart(product);
                      }
                    }}
                    className={`w-full py-2 rounded text-white transition ${
                      status === "idle"
                        ? "bg-black hover:bg-gray-800"
                        : "bg-green-600"
                    }`}
                  >
                    {status === "idle" && "Add to Cart"}
                    {status === "added" && "Added"}
                    {status === "view" && "View Cart"}
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