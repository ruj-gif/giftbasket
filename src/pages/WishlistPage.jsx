import React, { useState } from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // track button state per product
  const [addedMap, setAddedMap] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);

    // step 1 → show "Added"
    setAddedMap((prev) => ({
      ...prev,
      [product.id]: "added",
    }));

    // step 2 → switch to "View Cart"
    setTimeout(() => {
      setAddedMap((prev) => ({
        ...prev,
        [product.id]: "view",
      }));
    }, 800); // faster than before
  };

  return (
    <div className="min-h-screen bg-[#fafafa] px-6 py-10">

      {/* TITLE */}
      <h2 className="text-4xl font-serif italic text-stone-900 border-b border-stone-200 pb-4 mb-8">
        Wishlist
      </h2>

      {/* EMPTY */}
      {wishlist.length === 0 && (
        <div className="text-center mt-20 text-stone-500 uppercase tracking-widest text-sm font-medium">
          No items in wishlist
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const status = addedMap[product.id] || "idle";

          return (
            <div
              key={product.id}
              className="bg-[#fdfdfd] border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group relative"
            >

              {/* IMAGE */}
              <div className="relative bg-stone-50 h-48 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500"
                />

                {/* REMOVE FROM WISHLIST */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <span className="text-red-500 text-lg">♥</span>
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-6">
                <h4 className="font-serif text-lg text-stone-900 mb-2 truncate">
                  {product.name}
                </h4>

                <p className="text-stone-800 font-medium mb-4">
                  ₹ {product.price}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => {
                    if (status === "view") {
                      navigate("/cart");
                    } else {
                      handleAddToCart(product);
                    }
                  }}
                  className={`w-full py-2 rounded-full text-white transition ${
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

            </div>
          );
        })}
      </div>
    </div>
  );
}