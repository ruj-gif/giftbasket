import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSettings } from "../contexts/SettingsContext";
import { FiPhone, FiMail } from "react-icons/fi"; // ✅ ADDED

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

export default function AboutPage() {
  const { settings, loading } = useSettings();

  if (loading) return null;

  const siteName = settings?.site_name || "Gift Basket";
  const heroTitle =
    settings?.hero_title || "Crafting Luxury Gifting Experiences Since 2017";

  const aboutText =
    settings?.about ||
    "Gift Basket is a boutique brand redefining luxury gifting through curated experiences.";

  const phone = settings?.phone || "919674243961";
  const email = settings?.email || "giftbasketkolkata@gmail.com";

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">

      {/* HERO */}
      <div className="relative h-[450px] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Gift Background"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/90" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-white px-4"
        >
          <motion.p variants={fadeUp} className="uppercase tracking-[0.4em] text-xs mb-4 text-white/70">
            Our Story
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif italic mb-4">
            {siteName}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-sm text-white/80">
            {heroTitle}
          </motion.p>
        </motion.div>
      </div>

      {/* STORY */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-20 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >

        <motion.div
          variants={fadeUp}
          className="relative group h-[520px] flex items-center justify-center overflow-visible bg-gradient-to-br from-black via-stone-900 to-black rounded-md shadow-xl"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:20px_20px]" />

          <div className="absolute w-80 h-80 bg-amber-400/20 rounded-full blur-3xl group-hover:scale-110 transition duration-700" />

          <div className="relative z-10 text-center px-6 text-white">
            <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-4">
              Since 2017
            </p>

            <h3 className="text-4xl md:text-5xl font-serif italic mb-4">
              Crafted with Emotion
            </h3>

            <p className="text-sm text-white/70 max-w-xs mx-auto">
              Every gift tells a story — designed with elegance.
            </p>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-white text-black px-6 py-4 shadow-2xl text-center rounded-sm">
            <p className="text-lg font-serif italic whitespace-nowrap">
              Est. 2017
            </p>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">
              Luxury Gifts
            </p>
          </div>

        </motion.div>

        <motion.div variants={fadeUp}>
          <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-6">
            The Art of Thoughtful Gifting
          </h2>

          <div className="w-20 h-[2px] bg-black mb-8"></div>

          <p className="text-stone-600 mb-6 text-lg leading-relaxed">
            {aboutText}
          </p>

          <Link to="/shop">
            <button className="group px-10 py-4 bg-black text-white text-sm tracking-widest uppercase relative overflow-hidden">
              <span className="relative z-10">Explore Collection →</span>
              <span className="absolute inset-0 bg-amber-500 scale-x-0 group-hover:scale-x-100 origin-left transition duration-500"></span>
            </button>
          </Link>
        </motion.div>

      </motion.section>

      {/* VALUES */}
      <motion.section
        className="bg-white py-24 border-t"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif italic mb-6">
            Why Choose Us
          </motion.h2>

          <div className="w-16 h-[2px] bg-stone-300 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Premium Quality", desc: "Only the finest products." },
              { title: "Personalization", desc: "Tailored to your story." },
              { title: "Elegant Packaging", desc: "Designed to impress." }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 border hover:shadow-lg bg-[#fafafa]"
              >
                <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                <p className="text-stone-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        className="py-28 bg-black text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          <div>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
              Get in Touch
            </h2>

            <p className="text-stone-400 mb-8">
              Let’s create something special together.
            </p>

            {/* ✅ ICONS REPLACED */}
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <FiPhone /> +{phone}
              </p>
              <p className="flex items-center gap-2">
                <FiMail /> {email}
              </p>
            </div>
          </div>

          <div className="bg-white text-black p-8 shadow-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const name = e.target.name.value;
                const message = e.target.message.value;

                const text = `Hello! I'm ${name}\n\n${message}`;
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

                window.open(url, "_blank");
              }}
              className="space-y-4"
            >
              <input name="name" placeholder="Your Name" required className="w-full border p-3" />
              <textarea name="message" placeholder="Your Message" required rows="4" className="w-full border p-3" />

              <button className="w-full bg-black text-white py-3 hover:bg-stone-800 transition">
                Send on WhatsApp →
              </button>
            </form>
          </div>

        </div>
      </motion.section>

    </div>
  );
}