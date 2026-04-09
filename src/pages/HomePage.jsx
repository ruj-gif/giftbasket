import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";

import { api } from "../lib/api";
import { useSettings } from "../contexts/SettingsContext";
import LoadingSpinner from "../components/LoadingSpinner";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  const { settings } = useSettings();
  const siteName = settings?.site_name || "Gift Basket";

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
      {/* HERO */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        <motion.img
          style={{ y: yParallax }}
          src="/hero.jpg"
          alt="Gift Banner"
          className="absolute inset-0 w-full h-[120vh] object-cover -top-[10vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/90" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
        >
          <motion.p variants={fadeUp} className="uppercase tracking-[0.4em] text-xs mb-4 text-white/70">
            Welcome to
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-white text-5xl md:text-7xl font-serif italic mb-6">
            {siteName}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/90 text-sm md:text-lg tracking-[0.3em] uppercase mb-10 max-w-xl leading-relaxed">
            Bespoke Luxury Hampers <br className="md:hidden" />Since 2017
          </motion.p>

          <motion.button
            variants={fadeUp}
            onClick={() => navigate("/shop")}
            className="group px-10 py-4 bg-white text-black text-sm tracking-widest uppercase relative overflow-hidden shadow-2xl"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Shop Now</span>
            <span className="absolute inset-0 bg-amber-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
          </motion.button>
        </motion.div>
      </section>

      {/* TRUST */}
      <motion.section 
        className="bg-white py-24 border-b"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="uppercase tracking-[0.4em] text-xs mb-4 text-stone-500">
              Why Choose Us
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif italic mb-6 text-stone-900">
              Our Promise
            </motion.h2>
            <div className="w-16 h-[2px] bg-stone-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <motion.div variants={fadeUp} className="relative group p-8 rounded-md shadow-xl bg-[#1a1a1a] text-white overflow-hidden transition-transform duration-500 hover:-translate-y-2 cursor-default">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:22px_22px]" />
              <div className="relative z-10">
                <Truck className="mx-auto mb-6 w-8 h-8 text-amber-500" />
                <h3 className="text-xl font-serif mb-3">Concierge Delivery</h3>
                <p className="text-sm text-white/70 leading-relaxed">Same-Day options available for your urgent gifting needs.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative group p-8 rounded-md shadow-xl bg-[#1a1a1a] text-white overflow-hidden transition-transform duration-500 hover:-translate-y-2 cursor-default">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:22px_22px]" />
              <div className="relative z-10">
                <ShieldCheck className="mx-auto mb-6 w-8 h-8 text-amber-500" />
                <h3 className="text-xl font-serif mb-3">Artisan Quality</h3>
                <p className="text-sm text-white/70 leading-relaxed">Premium curated products handpicked from trusted brands.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative group p-8 rounded-md shadow-xl bg-[#1a1a1a] text-white overflow-hidden transition-transform duration-500 hover:-translate-y-2 cursor-default">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:22px_22px]" />
              <div className="relative z-10">
                <Sparkles className="mx-auto mb-6 w-8 h-8 text-amber-500" />
                <h3 className="text-xl font-serif mb-3">Bespoke Gifting</h3>
                <p className="text-sm text-white/70 leading-relaxed">Fully customizable hampers uniquely tailored to your story.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* COLLECTIONS */}
      <motion.section 
        className="py-24 bg-[#fafafa]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="uppercase tracking-[0.4em] text-xs mb-4 text-stone-500">
              Discover
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif italic mb-6 text-stone-900">
              Curated Collections
            </motion.h2>
            <div className="w-16 h-[2px] bg-stone-300 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="h-full">
              <Link to="/shop?category=Gift Hampers" className="block h-full">
                <div className="relative group h-[400px] flex flex-col items-center justify-center overflow-hidden bg-stone-200 rounded-md shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                   <div className="absolute inset-0 bg-stone-300 mix-blend-multiply opacity-30" />
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[length:16px_16px]" />
                   <h3 className="text-4xl font-serif text-stone-900 italic mb-4 relative z-10 transition-transform duration-500">Gift Hampers</h3>
                   <span className="text-sm tracking-widest uppercase text-stone-600 relative z-10 font-medium group-hover:text-amber-600 transition-colors">Explore Collection →</span>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="h-full">
              <Link to="/customize" className="block h-full">
                <div className="relative group h-[400px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-stone-900 to-black rounded-md shadow-xl text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:20px_20px]" />
                   <div className="absolute w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-125 transition duration-700" />
                   <h3 className="text-4xl font-serif italic mb-4 relative z-10 transition-transform duration-500">Personalised Gifts</h3>
                   <span className="text-sm tracking-widest uppercase text-amber-500 relative z-10">Craft Yours →</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* STORE */}
      <motion.section 
        className="bg-black text-white py-28 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <p className="uppercase tracking-[0.4em] text-xs mb-4 text-stone-400">
            Location
          </p>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Visit Our Store</h2>
          <div className="w-16 h-[2px] bg-stone-700 mx-auto mb-8"></div>

          <p className="text-lg text-stone-400 mb-12 tracking-wide font-light">
            {settings?.address || "2, Abdul Halim Lane"}, {settings?.city || "Kolkata"}
          </p>

          <div className="w-full h-[400px] mb-12 rounded-md shadow-2xl overflow-hidden border border-white/10 p-2 bg-white/5">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=2,Abdul+Halim+Lane,Kolkata&output=embed"
              className="w-full h-full border-0 rounded"
              loading="lazy"
            />
          </div>

          <a
            href="https://maps.app.goo.gl/RtZZgAkrZvfMRgq4A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group px-10 py-4 border border-white/30 text-white text-sm tracking-widest uppercase relative overflow-hidden transition-colors hover:border-white shadow-lg"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">Get Directions</span>
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
          </a>
        </div>
      </motion.section>
    </div>
  );
}