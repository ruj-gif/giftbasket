import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useUser } from '../contexts/UserContext';

// src/components/Footer.jsx

export default function Footer() {
  const { settings } = useSettings();
  const { isLoggedIn } = useUser();

  // Updated to match the "SettingsPage" variable names
  const siteName = settings?.siteName || 'Aaroni Gifts';
  const siteLogo = settings?.siteLogo || '/logo.png';

  const contactPhone = settings?.phone || '+91 9674243961'; // Changed .contact_phone to .phone
  const contactEmail = settings?.email || 'giftbasketkolkata@gmail.com';
  const address = settings?.address || '2, Abdul Halim Lane, Kolkata - 700016';

  const socialInstagram = settings?.social_instagram || 'https://linktr.ee/giftbasketkolkata';

  // ... rest of your return code stays the same

  return (
    <footer className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="space-y-6">
            <Link to="/">
              <img
                src={siteLogo}
                alt={siteName}
                className="h-10"
              />
            </Link>

            <p className="text-gray-400 text-sm">
              Crafting beautiful, personalized gift baskets with love since 2017.
            </p>

            {/* ONLY INSTAGRAM */}
            <a
              href={socialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Instagram />
            </a>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-xs font-bold uppercase mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-white">Track Order</Link></li>
              {isLoggedIn && (
                <li><Link to="/my-orders" className="text-gray-400 hover:text-white">My Orders</Link></li>
              )}
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xs font-bold uppercase mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">

              <li className="flex items-center gap-3">
                <Phone size={16} />
                <a href={`tel:${contactPhone}`} className="hover:text-white">
                  {contactPhone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={16} />
                <a href={`mailto:${contactEmail}`} className="hover:text-white">
                  {contactEmail}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1" />
                <span>{address}</span>
              </li>

            </ul>
          </div>

          {/* CTA (instead of useless newsletter) */}
          <div>
            <h4 className="text-xs font-bold uppercase mb-6">Order Now</h4>

            <p className="text-gray-400 text-sm mb-6">
              Order custom hampers directly via Instagram or Linktree.
            </p>

            <a
              href="https://linktr.ee/giftbasketkolkata"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 text-xs font-bold uppercase hover:bg-red-600 hover:text-white transition"
            >
              Order Now
            </a>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {siteName}</p>

          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}