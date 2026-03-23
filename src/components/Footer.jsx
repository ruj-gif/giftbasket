import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useUser } from '../contexts/UserContext';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const { settings } = useSettings();
  const { isLoggedIn } = useUser();

  const footerContent = siteConfig.content?.footer || {};
  const siteName = settings?.site_name || siteConfig.site.name || 'Online Store';
  const siteLogo = settings?.site_logo || siteConfig.site.logo || 'data:image/svg+xml,%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20fill%3D%22%231A1A2E%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2240%22%20font-weight%3D%22bold%22%20fill%3D%22%23D4AF37%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22central%22%3ESHOP%3C%2Ftext%3E%3C%2Fsvg%3E';
  const contactPhone = settings?.contact_phone || siteConfig.site.contact?.phone || '+1 234 567 8900';
  const contactEmail = settings?.contact_email || siteConfig.site.contact?.email || 'info@onlinestore.com';
  const address = settings?.address || siteConfig.site.contact?.address || '123 Store Street, City, Country';
  const socialFacebook = settings?.social_facebook || siteConfig.site.social?.facebook;
  const socialInstagram = settings?.social_instagram || siteConfig.site.social?.instagram;
  const socialX = settings?.social_x || siteConfig.site.social?.twitter;

  return (
    <footer className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={siteLogo}
                alt={siteName}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-text-light text-sm leading-relaxed max-w-xs">
              {footerContent.description || 'Refining the modern shopping experience with curated quality and timeless design.'}
            </p>
            <div className="flex space-x-5">
              {socialFacebook && (
                <a href={socialFacebook} target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialInstagram && (
                <a href={socialInstagram} target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialX && (
                <a href={socialX} target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="text-text-light hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-text-light hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/track-order" className="text-text-light hover:text-white transition-colors">Track Order</Link></li>
              {isLoggedIn && (
                <li><Link to="/my-orders" className="text-text-light hover:text-white transition-colors">My Orders</Link></li>
              )}
              <li><Link to="/contact" className="text-text-light hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-8">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-text-light">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{contactPhone}</span>
              </li>
              <li className="flex items-center gap-3 text-text-light">
                <Mail className="w-4 h-4 shrink-0" />
                <span>{contactEmail}</span>
              </li>
              <li className="flex items-start gap-3 text-text-light">
                <MapPin className="w-4 h-4 shrink-0 mt-1" />
                <span className="leading-relaxed">{address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-8">{footerContent.newsletterTitle || 'Newsletter'}</h4>
            <p className="text-text-light text-sm mb-6">{footerContent.newsletterSubtitle || 'Join our mailing list for updates and exclusive offers.'}</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border border-white/20 px-4 py-3 text-sm w-full focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-text-light">
          <p>&copy; {new Date().getFullYear()} {siteName}.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="https://qobo.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Made with ❤️ by QOBO</a>
          </div>
        </div>
      </div>
    </footer>
  );
}