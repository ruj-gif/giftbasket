import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext'; // ✅ Corrected Import

export default function Checkout() {
  const { cartItems } = useCart();
  const { settings } = useSettings(); // ✅ Corrected Hook usage
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    
    const itemList = cartItems.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('%0A');
    const message = `*NEW ORDER ALERT*%0A%0A*Customer:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}%0A%0A*Items:*%0A${itemList}%0A%0A*Total:* ₹${subtotal}`;
    
    // This will now use the WhatsApp number you set in your Settings!
    const whatsappNumber = settings.phone || "919876543210"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center font-display uppercase">Checkout</h1>
      <form onSubmit={handleWhatsAppOrder} className="bg-white p-8 border rounded-3xl shadow-sm space-y-6">
        {/* ... Form Inputs ... */}
        
        <button type="submit" className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-100">
          Confirm Order via WhatsApp
        </button>
      </form>
    </div>
  );
}