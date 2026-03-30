import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {

  const navigate = useNavigate(); // ✅ FIXED (inside component)

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

  return (
    <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8 bg-[#fafafa] min-h-screen">

      {/* LEFT */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-4xl font-serif italic text-stone-900 border-b border-stone-200 pb-4 mb-8">
          Your Cart
        </h2>

        {cart.length === 0 && (
          <div className="text-center text-stone-500 mt-20 uppercase tracking-widest text-sm font-medium">
            Your cart is empty
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-[#fdfdfd] p-6 border border-stone-200 hover:shadow-sm"
          >
            <div className="flex gap-6 items-center">

              <img
                src={item.image}
                className="w-24 h-24 object-contain bg-stone-50 p-2 border border-stone-100"
              />

              <div>
                <h4 className="font-serif text-lg text-stone-900 mb-1">
                  {item.name}
                </h4>
                <p className="text-stone-500 font-medium">₹{item.price}</p>

                {/* QTY */}
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => decreaseQty(item.id)} className="px-2 border">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)} className="px-2 border">+</button>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right flex flex-col items-end">
              <p className="font-medium text-stone-900 text-lg">
                ₹{item.price * item.qty}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="opacity-60 hover:opacity-100 mt-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="bg-[#fdfdfd] p-8 border border-stone-200 shadow-sm h-fit sticky top-20">

        <h3 className="text-2xl font-serif italic text-stone-900 mb-6 border-b pb-4">
          Order Summary
        </h3>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-3">
            <span>{item.name} x{item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr className="my-6" />

        <h3 className="text-xl font-serif italic flex justify-between mb-6">
          <span>Total</span>
          <span>₹{total}</span>
        </h3>

        {/* ✅ NAVIGATION BUTTON */}
        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-white hover:text-black border transition"
        >
          Continue to Checkout
        </button>

      </div>

    </div>
  );
}