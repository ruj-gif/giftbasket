import React from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleWhatsApp = () => {
    const number = "91XXXXXXXXXX"; // CHANGE

    let msg = "🛒 *New Order* \n\n";

    cart.forEach((item) => {
      msg += `${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    });

    msg += `\nTotal: ₹${total}`;

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">

      {/* LEFT: PRODUCTS */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-semibold">Your Cart</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                className="w-16 h-16 object-contain"
              />

              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                {/* QTY CONTROLS */}
                <div className="flex gap-2 mt-2">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p>₹{item.price * item.qty}</p>
              <button
  onClick={() => removeFromCart(item.id)}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#888",
    transition: "0.3s"
  }}
  onMouseEnter={(e) => (e.target.style.color = "red")}
  onMouseLeave={(e) => (e.target.style.color = "#888")}
>
  🗑️
</button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-20">
        <h3 className="text-xl mb-4">Order Summary</h3>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>{item.name} x{item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr className="my-4" />

        <h3 className="text-lg font-semibold">
          Total: ₹{total}
        </h3>

        <button
          onClick={handleWhatsApp}
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Proceed to WhatsApp 
        </button>
      </div>

    </div>
  );
}