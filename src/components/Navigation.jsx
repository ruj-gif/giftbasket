import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Navigation() {
  const { cartCount } = useCart();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 40px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontWeight: "700",
          fontSize: "20px",
          letterSpacing: "0.5px",
        }}
      >
        Gift Basket
      </div>

      {/* LINKS */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        {["Home", "About", "Shop", "Wishlist", "Customize", "Login"].map((item, i) => (
          <Link
            key={i}
            to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
            style={{
              textDecoration: "none",
              color: "#333",
              fontSize: "14px",
              fontWeight: "500",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#e11d48")}
            onMouseLeave={(e) => (e.target.style.color = "#333")}
          >
            {item}
          </Link>
        ))}

        {/* 🛍️ CART (Sophisticated) */}
        <Link to="/cart" style={{ position: "relative", textDecoration: "none" }}>
          <div
            style={{
              position: "relative",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #333",
              borderRadius: "6px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.borderColor = "#111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#333";
            }}
          >
            {/* SVG ICON */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#333" }}
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {/* COUNT BADGE */}
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "#111",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "600",
                  borderRadius: "50%",
                  padding: "3px 6px",
                  minWidth: "18px",
                  textAlign: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;