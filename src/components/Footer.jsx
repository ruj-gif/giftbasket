import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { useUser } from "../contexts/UserContext";

export default function Footer() {
  const { settings, loading } = useSettings();
  const { isLoggedIn } = useUser();

  if (loading) return null;

  const siteName = settings?.site_name || "Gift Basket";
  const siteLogo = settings?.logo || "/logo.png";

  const contactPhone = settings?.phone || "919674243961";
  const contactEmail = settings?.email || "giftbasketkolkata@gmail.com";

  // ✅ FIX: ADDRESS + CITY SUPPORT
  const address = settings?.address || "2, Abdul Halim Lane";
  const city = settings?.city || "Kolkata - 700016";

  const fullAddress = `${address}${city ? `, ${city}` : ""}`;

  const socialInstagram =
    settings?.instagram || "https://linktr.ee/giftbasketkolkata";

  const socialFacebook =
    settings?.facebook ||
    "https://www.facebook.com/people/Gift-Basket/100063696037449/?mibextid=ZbWKwL";

  const socialYoutube =
    settings?.youtube ||
    "https://www.youtube.com/@giftbasket771";

  return (
    <footer className="bg-stone-900 text-white py-16 md:py-24 border-t border-stone-800">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="space-y-6">
            <Link to="/">
              <img src={siteLogo} alt={siteName} className="h-10" />
            </Link>

            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Crafting beautiful, personalized gift baskets with love since 2017.
            </p>

            <div className="flex gap-4 text-stone-500">
              <a href={socialInstagram} target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>

              <a href={socialFacebook} target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>

              <a href={socialYoutube} target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-6">
              Navigation
            </h4>

            <ul className="space-y-3 text-sm">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>

              {isLoggedIn && (
                <li><Link to="/my-orders">My Orders</Link></li>
              )}

              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-6">
              Contact
            </h4>

            <ul className="space-y-4 text-sm text-stone-400">

              <li className="flex items-center gap-3">
                <Phone size={16} />
                <a href={`tel:${contactPhone}`}>
                  {contactPhone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={16} />
                <a href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={16} />
                <span>{fullAddress}</span> {/* ✅ FIXED */}
              </li>

            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] text-stone-400 uppercase mb-6">
              Order Now
            </h4>

            <a
              href={socialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 text-xs uppercase hover:bg-red-600 hover:text-white transition"
            >
              Order Now
            </a>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-16 pt-8 text-xs text-stone-500 flex justify-between">
          <p>© {new Date().getFullYear()} {siteName}</p>
        </div>

      </div>
    </footer>
  );
}