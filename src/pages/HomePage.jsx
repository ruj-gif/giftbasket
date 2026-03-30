import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

import { api } from "../lib/api";
import { useSettings } from "../contexts/SettingsContext";
import LoadingSpinner from "../components/LoadingSpinner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  const settingsContext = useSettings();
  const settings = settingsContext?.settings || {};

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.products.getAll();
      if (response.success) {
        setProducts(response.data || []);
      }
    } catch (err) {
      console.error("Home products error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#fafafa] text-gray-900 overflow-x-hidden font-sans">

      {/* HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-[1.05]"
          style={{
            y: yParallax,
            backgroundImage: `url('/hero.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        <motion.div 
          className="relative z-10 text-center text-white px-6 w-full max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="text-xs md:text-sm font-light mb-6 uppercase tracking-[0.3em] text-white/80">
            Bespoke Luxury Hampers Since 2017
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-10 drop-shadow-lg text-white">
            {settings?.siteName || "Gift Basket"}
          </motion.h1>
          <motion.div variants={fadeUp}>
            <Link to="/shop">
              <button className="px-12 py-4 bg-white text-black text-sm uppercase tracking-widest font-medium hover:bg-stone-200 transition-colors duration-300 rounded-none shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Shop the Collection
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="bg-white py-16 border-b border-stone-200 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { icon: <Truck size={28} className="text-stone-700" />, title: "Concierge Delivery", desc: "Same-Day options available for select regions." },
              { icon: <ShieldCheck size={28} className="text-stone-700" />, title: "Artisan Quality", desc: "Curated with the finest global selections." },
              { icon: <Sparkles size={28} className="text-stone-700" />, title: "Bespoke Gifting", desc: "Personalize every detail of your hamper." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center gap-4 group cursor-default">
                <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100 group-hover:scale-110 group-hover:bg-stone-100 group-hover:shadow-sm transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-500 max-w-[200px] mx-auto">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCES GRID (FEATURED CATEGORIES) */}
      <section className="py-24 bg-[#fafafa]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-4">Curated Collections</h2>
            <div className="w-16 h-[1px] bg-stone-300 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {/* Box 1 */}
            <Link to="/shop?category=Gift Hampers" className="group relative h-[500px] lg:h-[600px] overflow-hidden bg-stone-200">
              <img
                src="/unnamed.jpg"
                alt="Signature Hampers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <p className="text-stone-300 text-xs uppercase tracking-[0.2em] mb-3 font-medium">The Classics</p>
                <h3 className="text-white text-3xl md:text-4xl font-serif mb-4 flex items-center justify-between">
                  Signature Hampers
                  <ArrowRight className="w-6 h-6 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
                </h3>
              </div>
            </Link>

            {/* Box 2 */}
            <Link to="/shop?category=Personalised Gifts" className="group relative h-[500px] lg:h-[600px] overflow-hidden bg-stone-200">
              <img
                src="/unnamed (1).jpg"
                alt="Bespoke Creation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <p className="text-stone-300 text-xs uppercase tracking-[0.2em] mb-3 font-medium">Custom Build</p>
                <h3 className="text-white text-3xl md:text-4xl font-serif mb-4 flex items-center justify-between">
                  Personalised Gifts
                  <ArrowRight className="w-6 h-6 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-4">Latest Additions</h2>
              <div className="w-16 h-[1px] bg-stone-300"></div>
            </div>
            <Link to="/shop" className="group text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors mt-6 md:mt-0 flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {products.slice(0, 8).map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="group relative bg-[#fdfdfd] border border-stone-100 hover:border-stone-200 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 rounded-none overflow-hidden flex flex-col">
                <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />
                
                <div className="h-64 sm:h-72 w-full bg-stone-50 relative overflow-hidden flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                    <span className="text-white text-xs uppercase tracking-widest font-medium">Quick View</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow bg-white relative z-0">
                  <h3 className="text-stone-900 font-serif text-lg mb-2 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100">
                    <p className="text-stone-800 font-medium">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BRAND STORY SECTION */}
      <section className="bg-stone-900 text-stone-100 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-800/20 transform skew-x-12 opacity-50" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Sparkles className="w-8 h-8 mx-auto text-amber-500 mb-8 opacity-70" />
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8 drop-shadow-sm">The Art of Gifting</h2>
            <p className="text-stone-300 md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12">
              Every hamper we create is a testament to quality, luxury, and the joy of giving. From hand-picked artisanal treats to bespoke packaging, we obsess over the details so you can deliver unforgettable moments.
            </p>
            <Link to="/about">
              <button className="px-10 py-4 border border-stone-600 hover:border-white hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-[0.2em]">
                Discover Our Story
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}