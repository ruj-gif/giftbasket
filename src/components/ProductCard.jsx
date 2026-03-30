import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productId = product.id || product._id || product.slug;
  const isFav = isInWishlist(productId);

  const [wishMsg, setWishMsg] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* 🧱 PRODUCT CARD */}
      <div
        onClick={() => setShowModal(true)}
        className="group relative bg-[#fdfdfd] border border-stone-100 hover:border-stone-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 rounded-none overflow-hidden flex flex-col cursor-pointer"
      >
        {/* ❤️ WISHLIST */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({ ...product, id: productId });

            setWishMsg(true);
            setTimeout(() => setWishMsg(false), 1200);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            fontSize: "18px",
            cursor: "pointer",
            color: isFav ? "red" : "#aaa",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 2
          }}
        >
          ♥
        </button>

        {/* ❤️ WISHLIST POPUP */}
        {wishMsg && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "10px",
              background: "#000",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              zIndex: 2
            }}
          >
            {isFav ? "Added ❤️" : "Removed ❌"}
          </div>
        )}

        {/* IMAGE */}
        <div className="h-64 sm:h-72 w-full bg-stone-50 relative overflow-hidden flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* DETAILS */}
        <div className="p-6 flex flex-col flex-grow bg-white relative z-0">
          <h4 className="text-stone-900 font-serif text-lg mb-2 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">{product.name}</h4>
          <p className="text-stone-800 font-medium pt-2">₹ {product.price}</p>

          {/* 🛒 ADD TO CART */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ ...product, id: productId });

              setShowPopup(true);
              setTimeout(() => setShowPopup(false), 1200);
            }}
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
              width: "100%"
            }}
          >
            🛒 Add to Cart
          </button>

          {/* 🛒 CART POPUP */}
          {showPopup && (
            <div
              className="mt-3 bg-stone-900 text-white p-2 rounded-none text-xs text-center uppercase tracking-widest absolute bottom-2 left-4 right-4"
            >
              Added to cart ✅
            </div>
          )}
        </div>
      </div>

      {/* 🔍 ZOOM MODAL */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "90%",
              textAlign: "center"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />

            <h3 className="text-2xl font-serif italic text-stone-900 mb-2">{product.name}</h3>
            <p className="text-stone-800 font-medium mb-4">₹ {product.price}</p>

            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}