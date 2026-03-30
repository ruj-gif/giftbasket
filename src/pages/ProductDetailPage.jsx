import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Heart, Check, ChevronRight, Minus, Plus, Sparkles, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { siteConfig } from '../config/siteConfig';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const productContent = siteConfig.content?.product || {};
  const theme = siteConfig.theme || {};

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await api.products.getAll({ slug, published: true });
      if (response.success && response.data && response.data.length > 0) {
        setProduct(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light text-lg">Product not found</p>
      </div>
    );
  }

  const price = Number(product.discount_price || product.price || 0);
  const originalPrice = product.discount_price ? Number(product.price || 0) : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;

  const sizes = product.sizes ? (typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes) : [];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || sizes[0]);
  };

  const currency = theme.currency || '₹';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#fafafa] py-10 sm:py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-stone-400 mb-10 font-medium"
        >
          <Link to="/" className="hover:text-amber-800 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <Link to="/shop" className="hover:text-amber-800 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-stone-900 font-bold">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 bg-[#fdfdfd] border border-stone-200 p-8 sm:p-12 mb-12 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-stone-50 mb-6 border border-stone-100 group">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal italic mb-6 text-stone-900 leading-tight">{product.name}</h1>

            {product.category && (
              <p className="text-[10px] font-medium text-stone-600 uppercase tracking-[0.2em] mb-8 inline-block bg-stone-100 border border-stone-200 px-4 py-1.5">
                {product.category}
              </p>
            )}

            <motion.div className="mb-10 p-8 bg-stone-50 border border-stone-200 relative">
              <div className="flex items-baseline space-x-4 mb-2">
                <span className="font-serif text-4xl text-stone-900">
                  {currency}{price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-xl text-stone-400 line-through font-light">
                    {currency}{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount && (
                <div className="inline-flex items-center gap-2 bg-stone-900 text-white px-3 py-1.5 text-[10px] uppercase font-medium tracking-widest absolute top-0 -translate-y-1/2 right-8">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Save {discount}% OFF
                </div>
              )}
            </motion.div>

            <div className="mb-10">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-900 mb-4">{productContent.descriptionTitle || 'Description'}</h3>
              <p className="text-stone-500 leading-relaxed text-sm font-light">{product.description}</p>
            </div>

            {sizes.length > 0 && (
              <motion.div className="mb-10">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-900 mb-4">{productContent.selectSize || 'Select Size'}</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3.5rem] h-12 flex items-center justify-center rounded-lg font-black text-xs uppercase transition-all tracking-widest ${
                        selectedSize === size || (!selectedSize && size === sizes[0])
                          ? 'bg-black text-white shadow-hover border-black'
                          : 'border-2 border-border text-text-light hover:border-black'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div className="mb-10">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-900 mb-4">{productContent.quantity || 'Quantity'}</h3>
              <div className="flex items-center gap-2 bg-background-light rounded-xl w-fit p-1.5 border border-border/30">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-black hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <Minus className="w-4 h-4 text-secondary" />
                </motion.button>
                <span className="text-lg font-black w-12 text-center text-secondary tracking-tighter">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-black hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4 text-secondary" />
                </motion.button>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black uppercase tracking-[0.2em] py-5 transition-all duration-300 flex items-center justify-center gap-3 text-xs"
              >
                <ShoppingCart className="w-5 h-5" />
                {productContent.addToCart || 'Add to Cart'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#f9fafb' }}
                whileTap={{ scale: 0.95 }}
                className="p-5 rounded-lg border-2 border-border hover:border-black transition-all shrink-0 flex items-center justify-center"
              >
                <Heart className="w-6 h-6 text-secondary" />
              </motion.button>
            </div>

            <motion.div className="space-y-5 border-t border-stone-200 pt-10">
              <div className="flex items-center gap-5 text-stone-500 group">
                <div className="w-10 h-10 border border-stone-200 flex items-center justify-center bg-stone-50 group-hover:bg-stone-100 transition-colors">
                  <Truck className="w-4 h-4 text-stone-600" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-stone-700">{productContent.freeShippingText || 'Free shipping on orders above'} ₹2000</span>
              </div>
              <div className="flex items-center gap-5 text-stone-500 group">
                <div className="w-10 h-10 border border-stone-200 flex items-center justify-center bg-stone-50 group-hover:bg-stone-100 transition-colors">
                  <RotateCcw className="w-4 h-4 text-stone-600" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-stone-700">{productContent.returnsText || 'Easy returns within 7 days'}</span>
              </div>
              <div className="flex items-center gap-5 text-stone-500 group">
                <div className="w-10 h-10 border border-stone-200 flex items-center justify-center bg-stone-50 group-hover:bg-stone-100 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-stone-600" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-stone-700">{productContent.securePaymentText || '100% secure payment'}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}