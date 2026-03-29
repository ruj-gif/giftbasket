import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';


import { useCart } from '../contexts/CartContext';
import { useSettings } from "../contexts/SettingsContext";
import { useUser } from '../contexts/UserContext';
import { siteConfig } from '../config/siteConfig';

export default function Navigation() {
  const { cartItems } = useCart();
  const settingsContext = useSettings();
  const settings = settingsContext?.settings || {};
  const { isLoggedIn } = useUser();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();

  // Update cart count
  const updateCartCount = () => {
    try {
      const rawData = localStorage.getItem('local_cart');
      const items = rawData ? JSON.parse(rawData) : [];
      setCartCount(items.length);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateCartCount);

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // ✅ NAV LINKS (Wishlist added here)
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/wishlist', label: 'Wishlist' }, // 🔥 ADDED
    { path: '/customize', label: 'Customize ' },
    { path: '/about', label: 'About Us' },
    ...(isLoggedIn ? [{ path: '/my-orders', label: 'My Orders' }] : []),
    { path: isLoggedIn ? '/account' : '/login', label: isLoggedIn ? 'Account' : 'Login' },
    { path: '/contact', label: 'Contact' },
  ];

  const siteName = settings?.siteName || siteConfig.site.name || 'Store';
  const siteLogo = settings?.site_logo || siteConfig.site.logo;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className={`sticky top-0 z-[60] backdrop-blur-md transition-all h-20 flex items-center ${
          scrolled ? 'bg-white border-b shadow-sm' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={siteLogo} alt="" className="h-10 w-10 object-contain" />
            <span className="font-black text-lg uppercase tracking-tighter">{siteName}</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* CART */}
            <Link to="/checkout" className="relative p-3 bg-black text-white rounded-full hover:scale-110 transition">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/checkout" className="relative p-2 bg-black text-white rounded-full">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[101] bg-white p-8 flex flex-col"
          >
            <button className="self-end mb-8" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>

            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-black uppercase mb-6"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}