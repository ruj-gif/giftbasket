import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f2]">

      {/* 🔥 HERO SECTION */}
      <div className="relative h-[300px] flex items-center justify-center text-center">
        <img
          src="/close-up-christmas-gift-box-decorated-with-dried-flowers-dry-orange-wrapped-craft-paper_169016-14622.avif"
          alt="Gift Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        <div className="relative z-10 text-white">
          <h1 className="text-5xl italic md:text-7xl font-bold drop-shadow-lg">
            Gift Basket
          </h1>
          <p className="mt-4 text-sm tracking-[0.3em] uppercase text-white/90">
            Bespoke Luxury Hampers Since 2017
          </p>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="container mx-auto px-4 py-16 max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        {/* 🎨 IMAGE */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800"
            alt="Gift Basket"
            className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-500"
          />
        </div>
<div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/30">

  <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
    Established in <span className="text-black">2017</span>
  </h2>

  <p className="text-gray-600 text-base font-normal mb-4">
    Gift Basket is a Kolkata-based gift shop specializing in
    <span className="text-500 font-semibold"> unique </span> and
    <span className="text-500 font-semibold"> personalized </span> gift baskets.
  </p>

  <p className="text-gray-600 text-base font-normal mb-4">
    As a family-owned business, we craft gifts for every occasion — from birthdays to corporate celebrations — with elegance and emotion.
  </p>

  <p className="text-gray-600 text-base font-normal mb-4">
    Whether it's a heartfelt surprise or a luxury hamper, we create experiences that leave a lasting impression.
  </p>

  <Link to="/shop">
    <button className="group bg-black text-white px-8 py-4 rounded-full
      border border-black transition-all duration-300
      hover:bg-white hover:text-black flex items-center gap-2 shadow-lg">
      
      Explore Our Collection
      <span className="group-hover:translate-x-1 transition-transform">→</span>
      
    </button>
  </Link>

</div>

      </div>

    </div>
  );
}