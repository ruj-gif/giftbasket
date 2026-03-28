import React from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, setCart } = useCart();

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        cart.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            <span>{item.name}</span>
            <span>₹ {item.price}</span>

            <button onClick={() => removeItem(i)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}