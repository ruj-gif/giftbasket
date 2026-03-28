import React from "react";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <p>Total: ₹ {total}</p>

      <button
        style={{
          background: "green",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Place Order
      </button>
    </div>
  );
}