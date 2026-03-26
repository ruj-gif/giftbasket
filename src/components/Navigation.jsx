import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
// Changed path from ../contexts/ to ../context/ to match your error log
import { useCart } from '../contexts/CartContext'; 
// src/components/Navigation.jsx
import { useSettings } from '../contexts/SettingsContext'; // ✅ Correct path and name
import { useUser } from '../contexts/UserContext';
import { siteConfig } from '../config/siteConfig';

export default function Navigation() {
  // 1. Pull cartItems instead of getCartCount
  const { cartItems } = useCart(); 
  const { settings } = useSettings();
  const { isLoggedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 2. Calculate the cart count directly from the array
 // Add a check to ensure cartItems exists before reducing
const cartCount = (cartItems || []).reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About Us' },
    ...(isLoggedIn ? [{ path: '/my-orders', label: 'My Orders' }] : []),
    { path: isLoggedIn ? '/account' : '/login', label: isLoggedIn ? 'Account' : 'Login' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const siteName = settings?.siteName || siteConfig.site.name || 'Online Store';
  const siteLogo = settings?.site_logo || siteConfig.site.logo || 'data:image/svg+xml,%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20fill%3D%22%231A1A2E%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2240%22%20font-weight%3D%22bold%22%20fill%3D%22%23D4AF37%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22central%22%3ESHOP%3C%2Ftext%3E%3C%2Fsvg%3E';
  const officialStoreText = siteConfig.content?.nav?.officialStoreText || 'Official Store';

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`sticky z-[60] backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 border-b border-border shadow-sm'
            : 'bg-background/80 border-b border-transparent'
        }`}
        style={{ top: 'var(--qobo-banner-height, 0px)' }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={siteLogo}
              alt={siteName}
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-black uppercase tracking-tighter group-hover:text-accent transition-colors">{siteName}</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-text-light uppercase">{officialStoreText}</span>
            </div>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-display text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                  isActive(link.path)
                    ? 'text-black border-b-2 border-black'
                    : 'text-text-light hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Link
              to="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-white shadow-xl flex flex-col md:hidden h-dvh overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="font-display font-extrabold text-black uppercase tracking-widest text-sm">Menu</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-background-light rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-display text-2xl font-bold uppercase tracking-tight transition-colors ${
                      isActive(link.path)
                        ? 'text-black underline underline-offset-8'
                        : 'text-text-light hover:text-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}