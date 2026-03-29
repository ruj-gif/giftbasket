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
        zIndex: 1000
      }}
    >
      {/* LOGO */}
      <div
        style={{
          fontWeight: "700",
          fontSize: "20px",
          letterSpacing: "0.5px"
        }}
      >
        Gift Basket
      </div>

      {/* LINKS */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center"
        }}
      >
        {["Home", "About", "Shop", "Wishlist", "Customize"].map((item, i) => (
          <Link
            key={i}
            to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
            style={{
              textDecoration: "none",
              color: "#333",
              fontSize: "14px",
              fontWeight: "500",
              transition: "0.3s"
            }}
            onMouseEnter={(e) => (e.target.style.color = "#e11d48")}
            onMouseLeave={(e) => (e.target.style.color = "#333")}
          >
            {item}
          </Link>
        ))}

        {/* ✅ FIXED CART ICON */}
        <Link to="/cart" style={{ position: "relative" }}>
          <span
            style={{
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            🛍️
          </span>

          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                background: "red",
                color: "#fff",
                fontSize: "10px",
                borderRadius: "50%",
                padding: "3px 6px"
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;