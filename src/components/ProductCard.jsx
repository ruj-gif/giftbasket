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
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          transition: "0.3s",
          background: "#fff",
          position: "relative",
          cursor: "pointer"
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-8px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
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
        <div style={{ height: "220px", overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "0.4s"
            }}
          />
        </div>

        {/* DETAILS */}
        <div style={{ padding: "12px" }}>
          <h4>{product.name}</h4>
          <p style={{ fontWeight: "bold" }}>₹ {product.price}</p>

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
              style={{
                marginTop: "8px",
                background: "#000",
                color: "#fff",
                padding: "5px",
                borderRadius: "5px",
                fontSize: "12px",
                textAlign: "center"
              }}
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

            <h3>{product.name}</h3>
            <p style={{ fontWeight: "bold" }}>₹ {product.price}</p>

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