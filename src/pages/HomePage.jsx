import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShoppingBag, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.products.getAll({ featured: true });
      if (res.success) setProducts(res.data || []);
    } catch (err) {
      console.error("Home products error:", err);
    } finally {
      setLoading(false);
    }
  };

  // UPDATED: Aesthetic Product-Category Data
  const shopItems = [
    { 
      name: "The Rose Gold Luxe", 
      price: "₹2,850",
      slug: "rose-gold-luxe", 
      size: "md:col-span-8", 
      img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200", 
      label: "Bestseller" 
    },
    { 
      name: "Midnight Treat", 
      price: "₹1,499",
      slug: "midnight-treat", 
      size: "md:col-span-4", 
      img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800", 
      label: "New Arrival" 
    }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#fafafa] text-gray-900 overflow-x-hidden selection:bg-red-600 selection:text-white font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            y: y1, 
            backgroundImage: `url('/hero_background.jpg')`,
            height: '120%' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#fafafa]" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-[9rem] font-serif italic mb-6 leading-none tracking-tighter text-gray-900 drop-shadow-sm">
              Gift Basket
            </h1>
            <p className="text-sm md:text-lg text-gray-600 mb-10 max-w-lg mx-auto font-medium tracking-[0.2em] uppercase">
              Bespoke Luxury Hampers Since 2017
            </p>
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gray-900 rounded-full overflow-hidden transition-all hover:bg-red-600 shadow-xl"
            >
              <span className="relative z-10 uppercase text-[11px] font-bold tracking-[0.3em] text-white">
                Shop the Collection
              </span>
              <ShoppingBag size={18} className="relative z-10 text-white group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>
        </div> 
      </section>

      {/* ================= TRUST INDICATORS ================= */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <Zap size={18} className="text-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Kolkata Same-Day Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-gray-400 border-x border-gray-100">
            <ShieldCheck size={18} className="text-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Premium Hand-Packed Luxe</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <Sparkles size={18} className="text-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest">100% Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* ================= AESTHETIC PRODUCT GRID ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {shopItems.map((item, i) => (
              <Link 
                to={`/shop?filter=${item.slug}`} 
                key={i} 
                className={`${item.size} group relative h-[500px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                {/* Grayscale to Color Image */}
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-all duration-[1s] grayscale group-hover:grayscale-0 group-hover:scale-105" 
                  alt={item.name} 
                />
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Product Info: Title & Price */}
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500 mb-3 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.label}
                  </span>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-4xl font-serif italic mb-2 leading-none">{item.name}</h3>
                      <p className="text-lg font-light tracking-[0.1em] opacity-80">{item.price}</p>
                    </div>
                    <div className="bg-white text-gray-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED CATALOG ================= */}
      <section className="py-24 bg-white rounded-t-[3rem] shadow-2xl">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-6xl font-serif italic tracking-tighter text-gray-900 mb-2">The Catalog</h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em]">Hand-curated with emotion</p>
            </div>
            <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-red-600 pb-2 hover:text-red-500 transition-all">
               Explore Full Store
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-20 bg-white border-t border-gray-100 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif italic text-gray-900 mb-8">Gift Basket</h2>
          <p className="text-[9px] uppercase tracking-[0.5em] text-gray-400">
            © 2026 Crafted by Aaroni • Kolkata, India
          </p>
        </div>
      </footer>
    </div>
  );
}