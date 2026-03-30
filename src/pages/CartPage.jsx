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
    const number = "919674243961";

    let msg = "🛒 *New Order* \n\n";

    cart.forEach((item) => {
      msg += `• ${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    });

    msg += `\n💰 *Total: ₹${total}*`;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8 bg-[#fafafa] min-h-screen">

      {/* LEFT */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-4xl font-serif italic text-stone-900 border-b border-stone-200 pb-4 mb-8">Your Cart</h2>

        {/* ✅ EMPTY CART */}
        {cart.length === 0 && (
          <div className="text-center text-stone-500 mt-20 uppercase tracking-widest text-sm font-medium">
            Your cart is empty
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-[#fdfdfd] p-6 rounded-none border border-stone-200 transition-all hover:border-stone-300 hover:shadow-sm"
          >
            <div className="flex gap-6 items-center">

              <img
                src={item.image}
                className="w-24 h-24 object-contain bg-stone-50 p-2 border border-stone-100 rounded-none mix-blend-multiply"
              />

              <div>
                <h4 className="font-serif text-lg text-stone-900 mb-1">{item.name}</h4>
                <p className="text-stone-500 font-medium">₹{item.price}</p>

                {/* QTY */}
                <div className="flex items-center gap-2 mt-2">

                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="px-2">{item.qty}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>

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
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    opacity: "0.6",
    transition: "0.2s"
  }}
  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
>
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
</button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="bg-[#fdfdfd] p-8 rounded-none border border-stone-200 shadow-sm h-fit sticky top-20">

        <h3 className="text-2xl font-serif italic text-stone-900 mb-6 border-b border-stone-200 pb-4">
          Order Summary
        </h3>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-3 text-stone-700 font-medium">
            <span>{item.name} <span className="text-stone-400">x{item.qty}</span></span>
            <span className="text-stone-900">₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr className="my-6 border-stone-200" />

        <h3 className="text-xl font-serif italic text-stone-900 mb-6 flex justify-between">
          <span>Total</span>
          <span>₹{total}</span>
        </h3>

        <button
  style={{
    background: "#111",
    color: "#fff",
    padding: "14px",
    borderRadius: "8px",
    width: "100%",
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: "0.6px",
    border: "1px solid #111",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.background = "#fff";
    e.target.style.color = "#111";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#111";
    e.target.style.color = "#fff";
  }}
>
  Continue to Checkout
</button>
      </div>

    </div>
  );
}