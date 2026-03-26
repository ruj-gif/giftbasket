import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, CheckCircle } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState('');

  // 1. Fetch products and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      const pRes = await api.products.getAll();
      const cRes = await api.categories.getAll();
      if (pRes.success) setProducts(pRes.data);
      if (cRes.success) setCategories(cRes.data);
    };
    fetchData();
  }, []);

  // 2. Optimized Add to Cart (Groups by ID instead of creating new cards)
  const handleAddToCart = (product) => {
  const stored = localStorage.getItem('local_cart');
  let currentCart = stored ? JSON.parse(stored) : [];
  
  // Check if item already exists by its ID
  const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    // If found, just increment the quantity
    currentCart[existingItemIndex].quantity = (currentCart[existingItemIndex].quantity || 1) + 1;
  } else {
    // If not found, add it as a new item with quantity 1
    currentCart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('local_cart', JSON.stringify(currentCart));
  window.dispatchEvent(new Event('cartUpdated'));
  
  setLastAdded(product.name);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 3000);
};

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // The 'return' must stay inside the export default function block
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white pt-20">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-80 p-8 border-r border-gray-50 flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="font-black text-2xl mb-10 uppercase tracking-tighter">Collections</h2>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeCategory === 'all' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`w-full text-left px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all ${activeCategory === cat.name ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN PRODUCT GRID */}
      <main className="flex-1 p-8 md:p-16">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Aaroni Exclusive</p>
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              {activeCategory === 'all' ? 'The Gallery' : activeCategory}
            </h1>
          </div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{filteredProducts.length} Products</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={() => handleAddToCart(p)} 
            />
          ))}
        </div>
      </main>

      {/* FLOATING SUCCESS TOAST */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-black text-white px-8 py-5 rounded-[30px] shadow-2xl flex items-center gap-4 border border-white/10 min-w-[320px]">
          <div className="bg-[#25D366] p-2 rounded-full">
            <CheckCircle size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Added to Bag</p>
            <p className="font-bold text-sm truncate">{lastAdded}</p>
          </div>
          <Link to="/checkout" className="ml-4 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}