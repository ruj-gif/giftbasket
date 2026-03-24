import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Instagram, Heart } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { api } from '../lib/api';
import { siteConfig } from '../config/siteConfig';

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await api.contact_messages.create(formData);
      if (response.success) {
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }, 5000);
      }
    } catch (error) {
      alert('Failed to send message.');
    } finally { setSubmitting(false); }
  };

  const contactPhone = "+91 9674243961";
  const contactEmail = "giftbasketkolkata@gmail.com";
  const address = "2, Abdul Halim Lane, Kolkata - 700 016";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#FDFCFB]">
      
      {/* AESTHETIC PEARL HEADER */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-[#F7F3F0]">
        {/* Soft Aesthetic Blobs (Pinkish-Red Glows) */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-100/50 blur-[120px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-50/50 blur-[100px] -ml-20 -mb-20" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-white/50 mb-8">
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-600">Bespoke Gifting</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-[#2D2D2D] mb-6 tracking-tighter uppercase italic leading-none">
              Get In <span className="text-red-600 underline decoration-red-200 underline-offset-8">Touch</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto font-medium italic">
              "Crafting emotions into luxury hampers since 2017."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 -mt-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            
            {/* CLEAN INFO SIDE */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-8">The Studio</h3>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                      <p className="font-bold text-gray-800">{contactEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Call / WhatsApp</p>
                      <p className="font-bold text-gray-800">{contactPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Visit</p>
                      <p className="font-bold text-gray-800 leading-tight">{address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
                   <a href="https://instagram.com/giftbasketkolkata" target="_blank" className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">
                     Instagram <Instagram size={14} />
                   </a>
                </div>
              </div>
            </div>

            {/* MINIMALIST FORM SIDE */}
            <div className="lg:col-span-7 bg-white p-10 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full py-3 border-b-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-800" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full py-3 border-b-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-800" placeholder="hello@brand.com" />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} required className="w-full py-3 border-b-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-800" placeholder="Wedding / Corporate / Birthday" />
                </div>

                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">How can we help?</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={3} className="w-full py-3 border-b-2 border-gray-100 focus:border-red-500 outline-none transition-all font-bold text-gray-800 resize-none" placeholder="Describe your dream hamper..." />
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition-all duration-500 shadow-xl shadow-red-200">
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}