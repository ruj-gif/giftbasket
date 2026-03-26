import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f2]">

      {/* 🔥 HERO SECTION */}
      <div className="relative h-[300px] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1600"
          alt="Gift Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
            About Gift Basket 
          </h1>
          <p className="mt-4 text-sm tracking-[0.3em] uppercase text-gray-300">
            Bespoke • Luxury • Gifting
          </p>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="container mx-auto px-4 py-16 max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        {/* 🎨 IMAGE */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800"
            alt="Gift Basket"
            className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* 📝 TEXT */}
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

          <p className="text-lg mb-4">
            <span className="font-bold text-black">Established in 2017</span>, 
            Gift Basket is a Kolkata-based gift shop specializing in
            <span className="text-pink-500 font-semibold"> unique </span> and
            <span className="text-orange-500 font-semibold"> personalized </span>
            gift baskets.
          </p>

          <p className="mb-4 text-gray-700">
            As a family-owned business, we craft gifts for every occasion —
            from birthdays to corporate celebrations — with elegance and emotion.
          </p>

          <p className="mb-4 text-gray-700">
            Whether it's a heartfelt surprise or a luxury hamper, we create
            experiences that leave a lasting impression.
          </p>

          <p className="mb-6 text-gray-700">
            Recognized as one of Kolkata’s finest gifting brands, we deliver
            quality, creativity, and trust.
          </p>

          {/* 🔥 BUTTON */}
          <Link to="/shop">
            <button className="group bg-black text-white px-6 py-3 rounded-full
                               border-2 border-black transition-all duration-300
                               hover:bg-white hover:text-black flex items-center gap-2">
              Explore Our Collection
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>

        </div>
      </div>

    </div>
  );
}