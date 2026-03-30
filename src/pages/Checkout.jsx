import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });

  // Correctly calculate total considering quantity
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");

    const whatsappNumber = "919674243961";
    let msg = `🛒 *New Order* \n\n👤 *Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\n📦 *Order Details:*\n`;

    cart.forEach((item) => {
      msg += `• ${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
    });

    msg += `\n💰 *Total: ₹${total}*`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 md:py-24 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-4xl font-serif italic text-stone-900 border-b border-stone-200 pb-4 mb-8 text-center">Checkout</h2>
        
        {cart.length === 0 ? (
          <div className="text-center text-stone-500 uppercase tracking-widest text-sm font-medium">
            Your cart is empty
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="bg-[#fdfdfd] border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
            <div>
              <label className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full mt-2 px-4 py-4 border border-stone-200 rounded-none bg-white focus:border-stone-500 outline-none transition-all font-sans text-sm text-stone-800" />
            </div>

            <div>
              <label className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Phone Number *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full mt-2 px-4 py-4 border border-stone-200 rounded-none bg-white focus:border-stone-500 outline-none transition-all font-sans text-sm text-stone-800" />
            </div>

            <div>
              <label className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Delivery Address *</label>
              <textarea name="address" required rows="3" value={formData.address} onChange={handleChange} className="w-full mt-2 px-4 py-4 border border-stone-200 rounded-none bg-white focus:border-stone-500 outline-none transition-all font-sans text-sm text-stone-800 resize-none"></textarea>
            </div>

            <hr className="border-stone-200 my-6" />

            <h3 className="text-xl font-serif italic flex justify-between mb-6 text-stone-900">
              <span>Total To Pay</span>
              <span>₹{total}</span>
            </h3>

            <button type="submit" className="w-full bg-black text-white py-4 rounded-none hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs font-medium">
              Place Order via WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
}