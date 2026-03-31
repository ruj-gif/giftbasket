import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productId = product.id || product._id || product.slug;
  const isFav = isInWishlist(productId);

  const [showPopup, setShowPopup] = useState(false);
  const [wishMsg, setWishMsg] = useState(false);

  return (
    <div className="bg-white border rounded-xl shadow p-4 relative">

      {/* ❤️ Wishlist */}
      <button
        onClick={() => {
          toggleWishlist({ ...product, id: productId });
          setWishMsg(true);
          setTimeout(() => setWishMsg(false), 1200);
        }}
        className="absolute top-2 right-2 text-lg"
        style={{ color: isFav ? "red" : "gray" }}
      >
        ♥
      </button>

      {wishMsg && (
        <div className="absolute top-10 right-2 text-xs bg-black text-white px-2 py-1 rounded">
          {isFav ? "Added ❤️" : "Removed"}
        </div>
      )}

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
      />

      {/* NAME */}
      <h3 className="text-lg font-semibold">
        {product.name}
      </h3>

      {/* ✅ DESCRIPTION (THIS WAS MISSING) */}
      <p className="text-sm text-gray-500 mt-1">
        {product.description || "No description available"}
      </p>

      {/* PRICE */}
      <p className="text-black font-medium mt-2">
        ₹{product.price}
      </p>

      {/* ADD TO CART */}
      <button
        onClick={() => {
          addToCart({ ...product, id: productId });
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 1200);
        }}
        className="w-full mt-3 bg-black text-white py-2 rounded"
      >
        Add to Cart
      </button>

      {showPopup && (
        <div className="text-xs text-center mt-2 bg-black text-white py-1 rounded">
          Added to cart ✅
        </div>
      )}
    </div>
  );
}