import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    
    // 1. Create the item list string
    const itemList = cartItems.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('%0A');
    
    // 2. Format the message
    const message = `*NEW ORDER ALERT*%0A%0A*Customer:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}%0A%0A*Items:*%0A${itemList}%0A%0A*Total:* ₹${subtotal}`;
    
    // 3. Your WhatsApp Number (Enter your number here)
    const whatsappNumber = "919876543210"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <form onSubmit={handleWhatsAppOrder} className="bg-white p-8 border rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Full Name</label>
          <input required type="text" className="w-full p-3 border rounded-lg" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">WhatsApp Phone Number</label>
          <input required type="text" className="w-full p-3 border rounded-lg" 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Full Delivery Address</label>
          <textarea required className="w-full p-3 border rounded-lg" rows="3"
            onChange={(e) => setFormData({...formData, address: e.target.value})} />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-bold">Total Amount to Pay: ₹{subtotal}</p>
          <p className="text-xs text-gray-500 mt-1">Payment will be confirmed via WhatsApp.</p>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700">
          Confirm Order via WhatsApp
        </button>
      </form>
    </div>
  );
}