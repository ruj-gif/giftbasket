import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Gift, Heart, Truck } from "lucide-react";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.products.getAll({ featured: true });
      if (res.success) setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#fafafa] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1600')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-6 italic"
          >
            Gift Basket
          </motion.h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl mx-auto">
            The magic touch with emotions. Luxury hampers crafted for every
            occasion.
          </p>

          <Link
            to="/shop"
            className="bg-red-600 px-10 py-4 rounded-full font-bold flex items-center gap-2 mx-auto w-fit hover:bg-red-700 transition"
          >
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <Sparkles className="mx-auto text-red-600 mb-4" />
          <h2 className="text-4xl font-black">Shop by Occasion</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {["Birthday", "Anniversary", "Festive"].map((cat, i) => (
            <div
              key={i}
              className="relative h-64 rounded-2xl overflow-hidden group"
            >
              <img
                src={`https://source.unsplash.com/600x400/?gift,${cat}`}
                className="w-full h-full object-cover group-hover:scale-110 transition"
                alt={cat}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{cat}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-2">Featured Hampers</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">
              curated with love
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800"
            className="rounded-2xl shadow-2xl"
            alt="about"
          />

          <div>
            <h2 className="text-5xl font-black mb-6">
              About Gift Basket
            </h2>

            <p className="text-gray-400 mb-6">
              Since 2017, we’ve been creating premium gifting experiences that
              capture emotions beautifully. Each hamper is handcrafted with care
              and luxury.
            </p>

            <Link
              to="/about"
              className="text-red-500 flex items-center gap-2"
            >
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-16">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Gift className="mx-auto text-red-600 mb-4" size={40} />
            <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-500">
              Carefully curated luxury products.
            </p>
          </div>

          <div>
            <Heart className="mx-auto text-red-600 mb-4" size={40} />
            <h3 className="font-bold text-lg mb-2">Made with Love</h3>
            <p className="text-gray-500">
              Every hamper crafted emotionally.
            </p>
          </div>

          <div>
            <Truck className="mx-auto text-red-600 mb-4" size={40} />
            <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-500">
              Reliable & quick shipping.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-red-600 text-white text-center">
        <h2 className="text-5xl font-black mb-6">
          Make Every Occasion Special
        </h2>

        <a
          href="https://linktr.ee/giftbasketkolkata"
          target="_blank"
          rel="noreferrer"
          className="bg-white text-red-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Order Now
        </a>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 bg-black text-gray-400 text-center text-sm">
        © 2026 Gift Basket. All rights reserved.
      </footer>
    </div>
  );
}