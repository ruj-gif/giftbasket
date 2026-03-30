import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">

      {/* 🔥 HERO */}
      <div className="relative h-[400px] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Gift Background"
          className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        <div className="relative z-10 text-white px-4 pt-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-6 drop-shadow-lg text-white">
            Gift Basket
          </h1>
          <p className="text-xs md:text-sm font-light uppercase tracking-[0.3em] text-white/80">
            Bespoke Luxury Hampers Since 2017
          </p>
        </div>
      </div>

      {/* 🔥 ABOUT SECTION */}
      <div className="container mx-auto px-6 py-24 max-w-6xl grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="group">
          <div className="relative overflow-hidden bg-stone-200">
            <img
              src="/bg.jpg"
              alt="Gift Basket"
              className="w-full h-[500px] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="bg-white p-10 md:p-14 border border-stone-100 shadow-sm relative">
          <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-6 leading-tight">
            Established in 2017
          </h2>
          <div className="w-16 h-[1px] bg-stone-300 mb-8"></div>

          <p className="text-stone-600 mb-4 leading-relaxed font-light text-lg">
            Gift Basket is a Kolkata-based gift shop specializing in
            <span className="font-medium text-stone-900"> unique </span> and
            <span className="font-medium text-stone-900"> personalized </span> gift baskets.
          </p>

          <p className="text-stone-600 mb-4 leading-relaxed font-light text-lg">
            As a family-owned business, we craft gifts for every occasion —
            from birthdays to corporate celebrations — with elegance and emotion.
          </p>

          <p className="text-stone-600 mb-10 leading-relaxed font-light text-lg">
            We create experiences that leave a lasting impression.
          </p>

          <Link to="/shop">
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-red-500 transition-all duration-300 shadow-md hover:shadow-lg">
              Explore Collection →
            </button>
          </Link>
        </div>
      </div>

      {/* 🔥 CONTACT SECTION */}
      <section className="py-24 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-6">
              Get in Touch
            </h2>
            <div className="w-16 h-[1px] bg-stone-300 mb-8"></div>

            <p className="text-stone-600 mb-8 leading-relaxed font-light text-lg">
              Have a custom request or need help choosing the perfect gift?
              We’d love to hear from you.
            </p>

            <div className="space-y-4 text-stone-700 font-medium tracking-wide">
              <p className="flex items-center gap-3">📍 <span className="text-stone-900">2, Abdul Halim Lane, Kolkata - 700016</span></p>
              <p className="flex items-center gap-3">📞 <span className="text-stone-900">+91 9674243961</span></p>
              <p className="flex items-center gap-3">📧 <span className="text-stone-900">giftbasketkolkata@gmail.com</span></p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-[#fdfdfd] border border-stone-200 p-8 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const name = e.target.name.value;
                const message = e.target.message.value;

                const phone = "919674243961";

                const text = `Hello! I'm ${name}

${message}`;

                const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

                window.open(url, "_blank");
              }}
              className="space-y-4"
            >
              <input
                name="name"
                placeholder="Your Name"
                required
                className="w-full border border-stone-200 p-4 rounded-none outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all font-sans text-sm placeholder-stone-400"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                className="w-full border border-stone-200 p-4 rounded-none outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all font-sans text-sm placeholder-stone-400"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full hover:scale-[1.02] transition-all duration-300 shadow-md"
              >
                💬 Send on WhatsApp
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}