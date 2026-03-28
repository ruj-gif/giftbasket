import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isFav, setIsFav] = useState(false);

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
        background: "#fff",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      {/* IMAGE */}
      <div style={{ height: "220px", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.4s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        />
      </div>

      {/* DETAILS */}
      <div style={{ padding: "12px" }}>
        <h4 style={{ margin: "5px 0" }}>{product.name}</h4>

        <p style={{ fontWeight: "bold", margin: "5px 0" }}>
          ₹ {product.price}
        </p>

        {/* ⭐ RATING */}
        <p style={{ fontSize: "14px", color: "#777" }}>⭐ 4.8</p>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          {/* ❤️ FAVORITE */}
          <button
            onClick={() => setIsFav(!isFav)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: isFav ? "red" : "#aaa", // 🔥 turns red
              transition: "0.2s",
            }}
          >
            ♥
          </button>

          {/* 🛒 ADD TO CART */}
          <button
            onClick={() => {
              addToCart(product);
              alert("Added to cart 🛒");
            }}
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}