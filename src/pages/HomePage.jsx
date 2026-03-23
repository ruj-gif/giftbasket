import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, Shield, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { siteConfig } from '../config/siteConfig';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [heroSections, setHeroSections] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featureBlocks, setFeatureBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const homeContent = siteConfig.content?.home || {};

  useEffect(() => {
    loadData();
  }, []);

  const slideCount = heroSections.length > 0 ? heroSections.length : 1;
  useEffect(() => {
    setCurrentSlide(0);
  }, [heroSections.length]);
  useEffect(() => {
    if (slideCount > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slideCount]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsRes, heroRes, featuresRes] = await Promise.all([
        api.products.getAll({ featured: true, published: true }),
        api.hero_sections.getAll({ published: true }),
        api.feature_blocks.getAll({ published: true }),
      ]);

      if (productsRes.success) {
        setProducts(productsRes.data || []);
      }
      if (heroRes.success && heroRes.data && heroRes.data.length > 0) {
        setHeroSections(heroRes.data);
      }
      if (featuresRes.success) {
        setFeatureBlocks((featuresRes.data || []).sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
      }
    } catch (error) {
      console.error('Failed to load homepage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const slides = heroSections.length > 0
    ? heroSections
    : [{
        title: 'Shop Quality Products',
        subtitle: 'Browse our curated collection. Fast delivery, trusted service, and hassle-free shopping.',
        cta_text: 'Shop Now',
        cta_link: '/shop',
        background_image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80',
      }];

  const iconMapping = {
    'Truck': Truck,
    'Shield': Shield,
    'Heart': Heart,
    'Sparkles': Sparkles,
  };

  return (
    <div className="min-h-screen">
      {/* Hero - Sliding Carousel */}
      <section className="relative overflow-hidden min-h-[70vh] md:min-h-[80vh]">
        <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => {
            const title = slide.title || homeContent.heroTitle || 'Shop Quality Products';
            const subtitle = slide.subtitle || homeContent.heroSubtitle || 'Browse our curated collection. Fast delivery, trusted service, and hassle-free shopping.';
            const ctaText = slide.cta_text || homeContent.heroCtaText || 'Shop Now';
            const ctaLink = slide.cta_link || homeContent.heroCtaLink || '/shop';
            const bgImage = slide.background_image_url || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80';

            return (
              <div
                key={slide.id || index}
                className="relative min-w-full shrink-0 h-[70vh] md:h-[80vh] flex items-center"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${bgImage})` }}
                  role="img"
                  aria-label={title}
                />
                <div className="absolute inset-0 bg-secondary/40" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary tracking-widest uppercase">{homeContent.newCollectionTag || 'New Collection'}</span>
                      </div>
                      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white mb-6">
                        {title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed mb-8 mx-auto md:mx-0">
                        {subtitle}
                      </p>
                      <Link
                        to={ctaLink}
                        className="bg-white text-black hover:bg-black hover:text-white border border-white transition-all duration-300 inline-flex items-center justify-center gap-2 text-base md:text-lg px-10 py-4 font-bold uppercase tracking-wider"
                      >
                        {ctaText}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all touch-manipulation"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-secondary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white active:scale-95 transition-all touch-manipulation"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-secondary" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">{homeContent.featuredTag || 'Featured'}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-4">
              {homeContent.featuredTitle || 'Popular Products'}
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto mt-4">
              {homeContent.featuredSubtitle || 'Handpicked products for you. Quality you can trust.'}
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-text-light font-bold text-xs uppercase tracking-[0.2em]">{homeContent.valuesTag || 'Our Values'}</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-secondary mt-4 uppercase tracking-tight">
              {homeContent.valuesTitle || 'The Shopping Experience'}
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featureBlocks.map((feature) => {
              const IconComponent = iconMapping[feature.icon] || Heart;
              return (
                <motion.div
                  key={feature.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="p-8 bg-white border border-border/50 group text-center"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-6 mx-auto bg-black text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-secondary mb-3 uppercase tracking-wide">{feature.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <motion.section className="relative overflow-hidden py-24 md:py-32 bg-secondary text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-8 uppercase tracking-tighter">
              {homeContent.ctaTitle || 'Elevate Your Style'}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 font-medium">
              {homeContent.ctaSubtitle || 'Curated essentials for the modern lifestyle. Discover quality that lasts.'}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link to="/shop" className="bg-white text-black hover:bg-black hover:text-white border border-white transition-all duration-300 inline-flex items-center justify-center gap-2 text-lg px-12 py-4 font-bold uppercase tracking-widest">
                {homeContent.ctaButtonText || 'Shop Collection'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center justify-center gap-2 text-lg px-12 py-4 font-bold uppercase tracking-widest">
                {homeContent.ctaContactText || 'Get In Touch'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}