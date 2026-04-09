import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ FIXED
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";

import { api } from "../lib/api";
import { useSettings } from "../contexts/SettingsContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ CORRECT PLACE

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  const { settings } = useSettings();

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

        <img
          src="/hero.jpg"
          alt="Gift Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

          <h1 className="text-white text-4xl md:text-6xl font-serif italic mb-6">
            Gift Basket
          </h1>

          <p className="text-white/90 text-sm md:text-lg tracking-[0.3em] uppercase mb-10">
            Bespoke Luxury Hampers Since 2017
          </p>

          {/* ✅ FIXED BUTTON */}
          <button
            onClick={() => navigate("/shop")}
            className="bg-white text-black px-6 py-3 text-sm uppercase hover:bg-black hover:text-white transition"
          >
            Shop Now
          </button>

        </div>
      </section>

      {/* TRUST */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-3 gap-10 text-center">

          <div>
            <Truck className="mx-auto mb-3" />
            <h3>Concierge Delivery</h3>
            <p className="text-sm text-gray-500">Same-Day options available</p>
          </div>

          <div>
            <ShieldCheck className="mx-auto mb-3" />
            <h3>Artisan Quality</h3>
            <p className="text-sm text-gray-500">Premium curated products</p>
          </div>

          <div>
            <Sparkles className="mx-auto mb-3" />
            <h3>Bespoke Gifting</h3>
            <p className="text-sm text-gray-500">Fully customizable hampers</p>
          </div>

        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-6">

          <Link to="/shop?category=Gift Hampers">
            <div className="h-[400px] bg-gray-200 flex items-center justify-center">
              Gift Hampers
            </div>
          </Link>

          <Link to="/customize">
            <div className="h-[400px] bg-gray-300 flex items-center justify-center">
              Personalised Gifts
            </div>
          </Link>

        </div>
      </section>

      {/* STORE */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-3xl mb-4">Visit Our Store</h2>

        <p className="text-sm text-gray-400 mb-6">
          {settings?.address}, {settings?.city}
        </p>

        <a
          href="https://maps.app.goo.gl/RtZZgAkrZvfMRgq4A"
          target="_blank"
          rel="noopener noreferrer"
          className="border px-4 py-2"
        >
          Get Directions
        </a>
      </section>

    </div>
  );
}