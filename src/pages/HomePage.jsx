import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

import { api } from "../lib/api";
import { useSettings } from "../contexts/SettingsContext";
import LoadingSpinner from "../components/LoadingSpinner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

      {/* HERO SECTION */}
      <section className="relative h-[100vh] w-full overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <img
    src="/hero.jpg"
    alt="Gift Basket Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* DARK OVERLAY (for premium feel) */}
  <div className="absolute inset-0 bg-black/40" />

  {/* CONTENT */}
  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif italic mb-6 drop-shadow-lg">
      Gift Basket
    </h1>

    <p className="text-white/90 text-sm md:text-lg tracking-[0.3em] uppercase mb-10">
      Bespoke Luxury Hampers Since 2017
    </p>

    <button
      onClick={() => window.location.href = "/shop"}
      className="px-10 py-4 bg-white text-black text-sm uppercase tracking-widest font-medium hover:bg-stone-200 transition duration-300 shadow-lg"
    >
      Shop Now
    </button>

  </div>
</section>

      {/* TRUST INDICATORS */}
      <section className="bg-white py-16 border-b border-stone-200 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { icon: <Truck size={28} className="text-stone-700" />, title: "Concierge Delivery", desc: "Same-Day options available for select regions." },
              { icon: <ShieldCheck size={28} className="text-stone-700" />, title: "Artisan Quality", desc: "Curated with the finest global selections." },
              { icon: <Sparkles size={28} className="text-stone-700" />, title: "Bespoke Gifting", desc: "Personalize every detail of your hamper." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-500 max-w-[200px] mx-auto">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     {/* CURATED COLLECTIONS */}
<section className="py-24 bg-[#fafafa]">
  <div className="container mx-auto px-6 max-w-7xl">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-4">
        Curated Collections
      </h2>
      <div className="w-16 h-[1px] bg-stone-300 mx-auto"></div>
    </div>

    <div className="grid md:grid-cols-2 gap-6 lg:gap-10">

      {/* CARD 1 */}
      <Link
        to="/shop?category=Gift Hampers"
        className="group relative h-[500px] overflow-hidden"
      >
        <img
          src="/unnamed.jpg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>

        {/* TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-3xl font-serif italic mb-2">
            Gift Hampers
          </h3>
          <p className="text-sm tracking-wide">
            Explore luxury hampers
          </p>
        </div>
      </Link>

      {/* CARD 2 */}
      <Link to="/customize"
        className="group relative h-[500px] overflow-hidden"
      >
        <img
          src="/unnamed (1).jpg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>

        {/* TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-3xl font-serif italic mb-2">
            Personalised Gifts
          </h3>
          <p className="text-sm tracking-wide">
            Customize your gifts
          </p>
        </div>
      </Link>

    </div>
  </div>
</section>

      {/* PREMIUM STORE EXPERIENCE */}
<section className="bg-[#0f0f0f] text-white py-28 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-black via-stone-900 to-black opacity-80" />

  <div className="relative z-10 max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
        Visit Our Store
      </h2>
      <div className="w-16 h-[1px] bg-stone-500 mx-auto mb-4"></div>
      <p className="text-stone-400 text-sm">
        Experience our handcrafted luxury gifting in person
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* MAP */}
      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.6036474333346!2d88.3638738!3d22.5565155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276fdeb418815%3A0x498a37aadcbd26bd!2sGift%20Basket%20-%20Premium%20Gift%20Shop%20%26%20Unique%20Gift%20Idea!5e0!3m2!1sen!2sin!4v1774889644956!5m2!1sen!2sin"
          className="w-full h-[400px] rounded-xl border border-white/10 shadow-2xl"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="store-location"
        ></iframe>
      </div>

      {/* DETAILS */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif italic">
          Gift Basket 
        </h3>

        <p className="text-stone-400 text-sm">
          Step into our store and explore curated hampers and bespoke gifting.
        </p>

        <div className="space-y-2 text-sm text-stone-300">
          <p><strong>Address:</strong> {settings?.address}, {settings?.city}</p>
<p><strong>Phone:</strong> +{settings?.phone}</p>
<p><strong>Email:</strong> {settings?.email}</p>
        </div>

        <a
          href="https://maps.app.goo.gl/RtZZgAkrZvfMRgq4A"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 border border-white text-white text-xs uppercase hover:bg-white hover:text-black transition"
        >
          Get Directions
        </a>
      </div>

    </div>
  </div>
</section>

      {/* BRAND STORY */}
      <section className="bg-stone-900 text-stone-100 py-32 text-center">
        <Sparkles className="w-8 h-8 mx-auto text-amber-500 mb-6" />
        <h2 className="text-4xl md:text-6xl font-serif italic mb-6">
          The Art of Gifting
        </h2>
        <p className="max-w-2xl mx-auto text-stone-300">
          Every hamper we create is a testament to quality and luxury.
        </p>
      </section>

    </div>
  );
}