import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, MessageCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  // 1. Load cart and listen for updates from ShopPage
  const loadCart = () => {
    const saved = localStorage.getItem('local_cart');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  // 2. Sync changes back to LocalStorage
  const syncCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('local_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  // 3. Update Quantity (Plus/Minus)
  const updateQuantity = (id, delta) => {
    const newCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    syncCart(newCart);
  };

  // 4. Remove Item
  const removeItem = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    syncCart(newCart);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);

  // 5. WhatsApp Order Handler
  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty!");
    
    const itemList = cartItems.map(item => 
      `• ${item.name} [x${item.quantity}] - ₹${item.price * item.quantity}`
    ).join('%0A');

    const message = `*NEW ORDER*%0A%0A` +
                    `*Items:*%0A${itemList}%0A%0A` +
                    `*Total Amount:* ₹${subtotal}`;
    
    window.open(`https://wa.me/+919674243961?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT: CLEAN ITEM LIST */}
        <div className="lg:col-span-7">
          <Link to="/shop" className="flex items-center gap-2 text-gray-400 hover:text-black mb-8 font-bold text-[10px] uppercase tracking-widest transition-all">
            <ChevronLeft size={14} /> Back to Shop
          </Link>
          
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-10 text-black">Your Selection</h1>
          
          <div className="space-y-8">
            {cartItems.length > 0 ? cartItems.map((item) => (
              <div key={item.id} className="flex gap-8 items-center pb-8 border-b border-gray-50">
                {/* Product Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-[35px] overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-black text-xl uppercase tracking-tight">{item.name}</h3>
                    <p className="font-black text-2xl text-[#25D366]">₹{item.price * item.quantity}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Control */}
                    <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-95">
                        <Minus size={14}/>
                      </button>
                      <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-95">
                        <Plus size={14}/>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                <p className="font-black text-gray-300 uppercase tracking-widest text-xs">Your bag is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: AESTHETIC SUMMARY CARD */}
        {/* RIGHT: AESTHETIC LIGHT SUMMARY CARD */}
<div className="lg:col-span-5 sticky top-10">
  <div className="bg-[#f8f8f8] border border-gray-100 p-10 md:p-14 rounded-[60px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.05)] relative overflow-hidden">
    
    {/* Subtle Decorative Background Blur */}
    <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#25D366]/5 rounded-full blur-[100px] pointer-events-none"></div>

    <div className="relative z-10">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-200/50">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-black">Summary</h2>
        <span className="bg-black text-white px-4 py-1 rounded-full text-[9px] font-black tracking-[0.2em] uppercase">
          {cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0)} Items
        </span>
      </div>
      
      <div className="space-y-6">
        {/* Breakdown */}
        <div className="flex justify-between items-center text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">
          <span>Subtotal</span>
          <span className="text-black text-lg tracking-tight">₹{subtotal}</span>
        </div>
        
        <div className="flex justify-between items-center text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">
          <span>Delivery</span>
          <span className="text-[#25D366] font-black tracking-widest">FREE</span>
        </div>
        
        {/* Main Payable Section */}
        <div className="pt-10 mt-6 border-t border-gray-200/50">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gray-300 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Total Payable</span>
              <span className="text-3xl font-black uppercase tracking-tighter text-black">Grand Total</span>
            </div>
            <div className="text-right">
               <p className="text-6xl font-black tracking-tighter text-[#25D366]">₹{subtotal}</p>
               <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mt-3">Taxes included</p>
            </div>
          </div>

          {/* High-Action Button */}
          <button 
            onClick={handleWhatsAppOrder}
            className="group w-full bg-[#25D366] text-white py-8 rounded-[35px] font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(37,211,102,0.2)]"
          >
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" /> 
            Confirm via WhatsApp
          </button>
        </div>
      </div>

      <p className="text-center text-[8px] text-gray-300 font-bold uppercase tracking-[0.4em] mt-12 leading-relaxed">
        Aaroni Secure Checkout <br/> Direct to WhatsApp
      </p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}