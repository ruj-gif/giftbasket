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
  const settingsContext = useSettings();
  const settings = settingsContext?.settings || {};
  const { isLoggedIn } = useUser();

  const siteName = settings?.siteName || "Gift Basket";
  const siteLogo = settings?.siteLogo || "/logoPNG-C.png";

  const contactPhone = settings?.phone || "919674243961";
  const contactEmail = settings?.email || "giftbasketkolkata@gmail.com";
  const address =
    settings?.address || "2, Abdul Halim Lane, Kolkata - 700016";

  const socialInstagram =
    settings?.social_instagram ||
    "https://linktr.ee/giftbasketkolkata";

  const socialFacebook =
    settings?.social_facebook ||
    "https://www.facebook.com/people/Gift-Basket/100063696037449/?mibextid=ZbWKwL";

  const socialYoutube =
    settings?.social_youtube ||
    "https://www.youtube.com/@giftbasket771";
  return (
    <footer className="bg-stone-900 text-white py-16 md:py-24 border-t border-stone-800">
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

            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Crafting beautiful, personalized gift baskets with love since 2017.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 text-stone-500">

              <a
                href={socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>

              <a
                href={socialFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>

              <a
                href={socialYoutube}
                target="_blank"
                rel="https://www.youtube.com/@giftbasket771"
                className="hover:text-white transition transform hover:scale-110"
              >
                <Youtube size={20} />
              </a>

            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.3em] text-stone-400 uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link to="/" className="text-stone-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-stone-400 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>

              {isLoggedIn && (
                <li>
                  <Link
                    to="/my-orders"
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    My Orders
                  </Link>
                </li>
              )}

              <li>
                <Link to="/contact" className="text-stone-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.3em] text-stone-400 uppercase mb-6">
              Contact
            </h4>

            <ul className="space-y-4 text-sm text-stone-400 font-light">

              <li className="flex items-center gap-3">
                <Phone size={16} className="text-stone-500" />
                <a
                  href={`tel:${contactPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {contactPhone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={16} className="text-stone-500" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {contactEmail}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-stone-500" />
                <span className="leading-relaxed">{address}</span>
              </li>

            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.3em] text-stone-400 uppercase mb-6">
              Order Now
            </h4>

            <p className="text-stone-400 text-sm mb-6 font-light leading-relaxed">
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
        <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4 font-light tracking-wide">

          <p>
            © {new Date().getFullYear()} {siteName}
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}