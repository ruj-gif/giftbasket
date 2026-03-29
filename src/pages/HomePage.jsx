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

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            y: y1,
            backgroundImage: `url('/hero.jpg')`,
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl italic mb-6 font-semibold">
            {settings?.siteName || "Gift Basket"}
          </h1>

          <p className="text-sm mb-10 uppercase tracking-[0.25em]">
            Bespoke Luxury Hampers Since 2017
          </p>

          <Link to="/shop">
            <button className="px-10 py-4 bg-black rounded-full hover:bg-red-600 transition">
              Shop the Collection
            </button>
          </Link>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-white py-12 border-y mt-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          {[{
            icon: <Zap className="text-red-600" />,
            text: "Same-Day Delivery"
          },{
            icon: <ShieldCheck className="text-red-600" />,
            text: "Premium Quality"
          },{
            icon: <Sparkles className="text-red-600" />,
            text: "Secure Checkout"
          }].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}

        </div>
      </section>

      {/* ✅ FEATURED GRID (FIXED LINKS) */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">

          {/* Bestseller Hampers */}
          <Link
            to="/shop?category=Gift Hampers"
            className="group relative h-[400px] rounded-2xl overflow-hidden"
          >
            <img
              src="/unnamed.jpg"
              className="w-full h-full object-cover group-hover:scale-110 transition"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
              Bestseller Hampers
            </div>
          </Link>

          {/* Build a Basket */}
          <Link
            to="/shop?category=Personalised Gifts"
            className="group relative h-[400px] rounded-2xl overflow-hidden"
          >
            <img
              src="/unnamed (1).jpg"
              className="w-full h-full object-cover group-hover:scale-110 transition"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
              Build a Basket
            </div>
          </Link>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 bg-white">
        <h2 className="text-3xl text-center mb-12 italic">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">

          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow p-4">

              <img
                src={product.image}
                className="h-40 w-full object-contain mb-4"
              />

              <h3 className="text-sm">
                {product.name}
              </h3>

              <p className="text-red-600 font-semibold">
                ₹{product.price}
              </p>

            </div>
          ))}

        </div>
      </section>

    </div>
  );
}