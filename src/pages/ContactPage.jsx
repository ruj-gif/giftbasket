import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { api } from '../lib/api';
import { siteConfig } from '../config/siteConfig';

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const contactContent = siteConfig.content?.contact || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactPhone = settings?.contact_phone || siteConfig.site.contact?.phone || '+1 234 567 8900';
  const contactEmail = settings?.contact_email || siteConfig.site.contact?.email || 'info@onlinestore.com';
  const address = settings?.address || siteConfig.site.contact?.address || '123 Store Street, City, Country';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background-light">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 sm:py-28 md:py-32 bg-secondary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px] -ml-64 -mb-64" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Us</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight uppercase tracking-tighter">
                {contactContent.title || 'Get in Touch'}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                {contactContent.subtitle || "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-20 sm:py-28 bg-background-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-12">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block opacity-70">Information</span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-secondary leading-tight uppercase tracking-tight">
                  {contactContent.infoTitle || 'Contact Information'}
                </h2>
                <p className="text-text-light text-base md:text-lg leading-relaxed font-medium">
                  {contactContent.infoSubtitle || 'Have a question or need assistance? Reach out to us through any of these channels.'}
                </p>
              </div>

              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-elegant border border-border/40 transition-all duration-300 group"
                >
                  <div className="bg-black text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-secondary text-xs uppercase tracking-widest mb-2">Email Us</h3>
                    <p className="text-text-light font-bold text-lg">{contactEmail}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-elegant border border-border/40 transition-all duration-300 group"
                >
                  <div className="bg-black text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-secondary text-xs uppercase tracking-widest mb-2">Call Us</h3>
                    <p className="text-text-light font-bold text-lg">{contactPhone}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-elegant border border-border/40 transition-all duration-300 group"
                >
                  <div className="bg-black text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-secondary text-xs uppercase tracking-widest mb-2">Visit Us</h3>
                    <p className="text-text-light font-bold text-lg leading-relaxed">{address}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="bg-white p-8 sm:p-12 rounded-2xl shadow-elegant border border-border/40 relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{contactContent.formName || 'Full Name'} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary bg-background-light/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{contactContent.formEmail || 'Email'} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary bg-background-light/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{contactContent.formSubject || 'Subject'} *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary bg-background-light/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-text-light">{contactContent.formMessage || 'Message'} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 border-2 border-border/60 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-secondary bg-background-light/30"
                  />
                </div>

                <AnimatePresence>
                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-success/10 border-2 border-success/30 rounded-xl p-6 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <p className="text-success font-black uppercase tracking-tight text-xs">{contactContent.formSuccess || 'Thank you! Your message has been sent successfully.'}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black uppercase tracking-[0.2em] py-5 transition-all duration-300 flex items-center justify-center gap-3 text-xs shadow-hover active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Processing...' : contactContent.formButton || 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
