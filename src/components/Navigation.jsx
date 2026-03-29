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
        padding: "15px 20px",
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      {/* LOGO */}
      <Link to="/" style={{ fontWeight: "bold", fontSize: "18px" }}>
        Gift Basket
      </Link>

      {/* MENU */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/customize">Customize</Link>

        {/* CART */}
        <Link to="/cart" style={{ position: "relative" }}>
          🛍️
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                background: "red",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "10px",
                padding: "3px 6px",
                minWidth: "18px",
                textAlign: "center"
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

export default Navigation; // ✅ THIS FIXES YOUR ERROR