import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Heart } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { api } from '../lib/api';

export default function ContactPage() {
  const { settings, loading } = useSettings(); // ✅ FIX

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ WAIT FOR SETTINGS
  if (loading) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.contact_messages.create(formData);

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      }
    } catch {
      alert('Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#fafafa]">

      {/* HEADER */}
      <section className="relative py-28 sm:py-36 bg-stone-50 border-b border-stone-200">
        <div className="container mx-auto px-6 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-stone-200 bg-white/50 mb-8">
              <Heart className="w-3 h-3 text-amber-600 fill-amber-600" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-600">
                Bespoke Gifting
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-serif italic text-stone-900 mb-6">
              Get In <span className="text-amber-800">Touch</span>
            </h1>

            <p className="text-stone-500 text-lg">
              "Crafting emotions into luxury hampers since 2017."
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">

            {/* INFO */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 border">

                <h3 className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-8">
                  The Studio
                </h3>

                <div className="space-y-8">

                  {/* EMAIL */}
                  <div className="flex items-center gap-5">
                    <Mail size={20} />
                    <div>
                      <p className="text-xs text-stone-400">Email</p>
                      <p className="font-medium">
                        {settings?.email || "giftbasketkolkata@gmail.com"}
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-center gap-5">
                    <Phone size={20} />
                    <div>
                      <p className="text-xs text-stone-400">Call / WhatsApp</p>
                      <p className="font-medium">
                        {settings?.phone || "919674243961"}
                      </p>
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div className="flex items-center gap-5">
                    <MapPin size={20} />
                    <div>
                      <p className="text-xs text-stone-400">Visit</p>
                      <p className="font-medium">
                        {settings?.address || "2, Abdul Halim Lane"},{" "}
                        {settings?.city || "Kolkata"} - {settings?.pincode || "700016"}
                      </p>
                    </div>
                  </div>

                </div>

                {/* SOCIAL */}
                <div className="mt-10 pt-6 border-t flex justify-between">
                  <a
                    href={settings?.instagram || "https://linktr.ee/giftbasketkolkata"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm"
                  >
                    Instagram <Instagram size={14} />
                  </a>
                </div>

              </div>
            </div>

            {/* FORM */}
            <div className="lg:col-span-7 bg-[#fdfdfd] p-10 border">
              <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="border-b p-2"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="border-b p-2"
                  />
                </div>

                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full border-b p-2"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  className="w-full border-b p-2"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 text-white py-4"
                >
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