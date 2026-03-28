import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, ShieldCheck, Sparkles } from "lucide-react";

import { api } from "../lib/api";
import { useSettings } from "../contexts/SettingsContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  // ✅ SAFE SETTINGS
  const settingsContext = useSettings();
  const settings = settingsContext?.settings || {};

  // ✅ LOAD PRODUCTS
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts(); // ✅ correct API call
      setProducts(data || []);
    } catch (err) {
      console.error("Home products error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#fafafa] text-gray-900 overflow-x-hidden font-sans">

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            y: y1,
            backgroundImage: `url('/hero.jpg')`,
            height: "120%"
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white">
          <h1 className="text-7xl md:text-[6rem] italic mb-6">
            {settings?.siteName || "Gift Basket"}
          </h1>

          <p className="text-sm md:text-lg mb-10 uppercase tracking-[0.2em]">
            Bespoke Luxury Hampers Since 2017
          </p>

          <Link to="/shop">
            <button className="px-10 py-4 bg-black rounded-full hover:bg-red-600 transition">
              Shop the Collection
            </button>
          </Link>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="bg-white py-10 border-y mt-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          <div className="flex items-center justify-center gap-2">
            <Zap className="text-red-600" />
            <span className="text-gray-600">Same-Day Delivery</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="text-red-600" />
            <span className="text-gray-600">Premium Quality</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-red-600" />
            <span className="text-gray-600">Secure Checkout</span>
          </div>

        </div>
      </section>

      {/* ================= FEATURED GRID ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">

            <Link
              to="/shop"
              className="group relative h-[400px] rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6 text-white text-2xl">
                Bestseller Hampers
              </div>
            </Link>

            <Link
              to="/shop"
              className="group relative h-[400px] rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f"
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6 text-white text-2xl">
                New Arrivals
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS (REAL DATA) ================= */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl text-center mb-12 font-serif italic">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition p-4"
            >
              <img
                src={product.image}
                className="h-40 w-full object-contain mb-4"
              />
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-red-600 font-semibold">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INSTAGRAM ================= */}
      <section className="py-20 bg-[#fafafa]">
        <h2 className="text-4xl text-center mb-12 font-serif italic">
          Our Creations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {[
            "/products/mugs/mug1.png",
            "/products/cushions/4.png",
            "/products/cushions/2.png",
            "/products/mugs/mug2.png"
          ].map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <img
                src={img}
                className="w-full h-64 object-contain bg-white p-2"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/giftbasketkolkata"
            target="_blank"
            rel="noopener noreferrer"
            className="border px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
          >
            View on Instagram →
          </a>
        </div>
      </section>

    </div>
  );
}