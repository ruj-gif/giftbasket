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
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>

        {/* ✅ EMPTY CART */}
        {cart.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            🛒 Your cart is empty
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex gap-4 items-center">

              <img
                src={item.image}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2"
              />

              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-gray-500">₹{item.price}</p>

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
            <div className="text-right">
              <p className="font-semibold">
                ₹{item.price * item.qty}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 text-gray-400 hover:text-red-500 text-lg transition"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-20">

        <h3 className="text-xl font-semibold mb-4">
          Order Summary
        </h3>

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
          className="w-full mt-5 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full hover:scale-[1.02] transition"
        >
          💬 Proceed to WhatsApp
        </button>
      </div>

    </div>
  );
}