import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f2] to-white">

      {/* 🔥 HERO */}
      <div className="relative h-[320px] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Gift Background"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60 backdrop-blur-[2px]" />

        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl md:text-7xl italic font-semibold tracking-tight drop-shadow-xl">
            Gift Basket
          </h1>
          <p className="mt-4 text-xs md:text-sm tracking-[0.35em] uppercase text-white/90">
            Bespoke Luxury Hampers Since 2017
          </p>
        </div>
      </div>

      {/* 🔥 ABOUT SECTION */}
      <div className="container mx-auto px-6 py-20 max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div className="group">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/bg.jpg"
              alt="Gift Basket"
              className="w-full h-[400px] object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-100">

          <h2 className="text-3xl md:text-4xl font-semibold mb-4 italic tracking-tight">
            Established in 2017
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Gift Basket is a Kolkata-based gift shop specializing in
            <span className="font-semibold text-black"> unique </span> and
            <span className="font-semibold text-black"> personalized </span> gift baskets.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            As a family-owned business, we craft gifts for every occasion —
            from birthdays to corporate celebrations — with elegance and emotion.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
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
      <section className="py-20 bg-gradient-to-b from-white to-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-3xl font-semibold italic mb-4">
              Get in Touch
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Have a custom request or need help choosing the perfect gift?
              We’d love to hear from you.
            </p>

            <div className="space-y-3 text-gray-700 text-sm">
              <p>📍 2, Abdul Halim Lane, Kolkata - 700016</p>
              <p>📞 +91 9674243961</p>
              <p>📧 giftbasketkolkata@gmail.com</p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
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
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="4"
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition"
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