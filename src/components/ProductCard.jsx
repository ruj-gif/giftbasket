import React, { useState } from 'react';
import { ShoppingCart, Search, X, Star } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col h-full">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          />
          
          {/* Zoom Hint Icon */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <Search className="text-white" size={32} />
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star size={10} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] font-black text-gray-800">{product.rating || "5.0"}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-auto">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="font-black text-lg uppercase tracking-tight leading-tight mb-2">{product.name}</h3>
            <p className="font-black text-xl text-black">₹{product.price}</p>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="mt-6 w-full bg-black text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/5"
          >
            <ShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>

      {/* ZOOM OVERLAY */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
            <X size={40} />
          </button>
          <img 
            src={product.image} 
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl animate-in zoom-in duration-300"
            alt="Zoomed product"
          />
        </div>
      )}
    </>
  );
}