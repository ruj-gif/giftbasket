import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronRight, LayoutGrid, ShoppingBag } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const pRes = await api.products.getAll();
      const cRes = await api.categories.getAll();
      if (pRes.success) setProducts(pRes.data);
      if (cRes.success) setCategories(cRes.data);
    };
    fetchData();
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fcfcfc]">
      <aside className="w-full md:w-80 bg-white border-r border-gray-100 p-6 md:sticky md:top-0 md:h-screen overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-black p-2 rounded-lg text-white"><Filter size={18} /></div>
          <h2 className="font-display font-black text-xl uppercase tracking-tighter">Collections</h2>
        </div>

        <nav className="space-y-1">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 font-bold text-[11px] uppercase tracking-widest ${activeCategory === 'all' ? 'bg-black text-white shadow-xl translate-x-2' : 'hover:bg-gray-50 text-gray-400'}`}
          >
            Personalised Gifts <LayoutGrid size={14} />
          </button>

          <div className="py-4 px-2 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Sub Categories</div>

          {categories.filter(cat => cat.name !== "Personalised Gifts").map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 font-bold text-[11px] uppercase tracking-widest ${activeCategory === cat.name ? 'bg-black text-white shadow-lg translate-x-2' : 'hover:bg-gray-50 text-gray-500 hover:text-black'}`}
            >
              {cat.name} <ChevronRight size={14} className={activeCategory === cat.name ? 'opacity-100' : 'opacity-20'} />
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-12">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-black uppercase tracking-tighter leading-tight">
            {activeCategory === 'all' ? 'Personalised Gifts' : activeCategory}
          </h1>
          <div className="h-1 w-20 bg-black mt-6"></div>
        </header>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-100 rounded-[40px]">
            <ShoppingBag size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No items in {activeCategory}</p>
          </div>
        )}
      </main>
    </div>
  );
}