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
      const res = await api.products.getAll();
      if (res.success) setProducts(res.data || []);
    } catch (err) {
      console.error("Home products error:", err);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="bg-[#fafafa] text-gray-900 overflow-x-hidden font-sans">

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            y: y1,
            backgroundImage: `url('/close-up-christmas-gift-box-decorated-with-dried-flowers-dry-orange-wrapped-craft-paper_169016-14622.avif')`,
            height: "120%"
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white">
          <h1 className="text-7xl md:text-[6rem] italic mb-6">
            Gift Basket
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

{/* TRUST */}
<section className="bg-white py-10 border-y mt-12">
  <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

    {/* 1 */}
    <div className="flex items-center justify-center gap-2">
      <Zap className="text-red-600" />
      <span className="text-gray-600 text-base font-light">
        Same-Day Delivery
      </span>
    </div>

    {/* 2 */}
    <div className="flex items-center justify-center gap-2">
      <ShieldCheck className="text-red-600" />
      <span className="text-gray-600 text-base font-light">
        Premium Quality
      </span>
    </div>

    {/* 3 */}
    <div className="flex items-center justify-center gap-2">
      <Sparkles className="text-red-600" />
      <span className="text-gray-600 text-base font-light">
        Secure Checkout
      </span>
    </div>

  </div>
</section>

{/* GRID */}
<section className="py-24">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

      {shopItems.map((item, i) => (
        <Link
          key={i}
          to="/shop"
          className="md:col-span-6 group relative h-[500px] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
        >

          <img
            src={item.img}
            className="w-full h-full object-cover transition-all duration-[1s] grayscale group-hover:grayscale-0 group-hover:scale-105"
            alt={item.name}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition" />

          <div className="absolute bottom-10 left-10 text-white">
            <h3 className="text-4xl font-serif italic mb-2">
              {item.name}
            </h3>
            <p className="text-lg opacity-80">{item.price}</p>
          </div>

        </Link>
      ))}

    </div>
  </div>
</section>

{/* OUR STORY */}
<section>...</section>
      {/* OUR STORY */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-5xl font-serif italic mb-6">
          Our Story
        </h2>

        <p className="max-w-xl mx-auto text-gray-600 mb-10">
          Since 2017, Gift Basket has been crafting meaningful gifting experiences.
        </p>

        <Link to="/about">
          <button className="px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition">
            Know More →
          </button>
        </Link>
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

      <div key={i} className="relative group overflow-hidden rounded-xl">

        {/* IMAGE */}
        <img
          src={img}
          className="w-full h-64 md:h-72 object-contain bg-white p-2"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* ICONS / TEXT */}
        <div className="absolute inset-0 flex items-center justify-center gap-6 text-white opacity-0 group-hover:opacity-100 transition duration-300">

          <span className="text-sm">❤️ 120</span>
          <span className="text-sm">👁 300</span>

        </div>

      </div>

    ))}

  </div>

  {/* BUTTON */}
  <div className="text-center mt-10">
    <a
      href="https://www.instagram.com/giftbasketkolkata?igsh=c3BqNmpwdTZmOHUz"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
    >
      View on Instagram →
    </a>
  </div>
</section>

      

      {/* FOOTER */}
      <footer className="py-20 text-center bg-white">
        <h2 className="text-4xl font-serif italic mb-4">
          Gift Basket
        </h2>
        <p className="text-sm text-gray-400">
          © 2026 • Kolkata, India
        </p>
      </footer>

    </div>
  );
}