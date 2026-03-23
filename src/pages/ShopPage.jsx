import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { siteConfig } from '../config/siteConfig';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const shopContent = siteConfig.content?.shop || {};

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        api.products.getAll({ published: true }),
        api.categories.getAll(),
      ]);

      if (productsRes.success) {
        setProducts(productsRes.data || []);
      }
      if (categoriesRes.success) {
        setCategories(categoriesRes.data || []);
      }
    } catch (error) {
      console.error('Failed to load shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const price = Number(product.discount_price || product.price || 0);
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') {
      return Number(a.discount_price || a.price || 0) - Number(b.discount_price || b.price || 0);
    } else if (sortBy === 'price_high') {
      return Number(b.discount_price || b.price || 0) - Number(a.discount_price || a.price || 0);
    }
    return 0;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background-light py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-secondary">
            {shopContent.title || 'Our Products'}
          </h1>
          <p className="text-text-light text-base sm:text-lg">{shopContent.subtitle || 'Browse our full catalog'}</p>
        </motion.div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-elegant w-full mb-6 font-semibold text-secondary touch-manipulation active:scale-[0.98] transition-transform"
        >
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          {shopContent.filterTitle || 'Filters'}
          {(selectedCategory || priceRange[1] < 30000) && (
            <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Active</span>
          )}
        </button>

        {/* Mobile filters overlay */}
        <AnimatePresence>
          {filtersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFiltersOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-display font-bold text-lg text-secondary">{shopContent.filterTitle || 'Filters'}</h3>
                  <button onClick={() => setFiltersOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-secondary">{shopContent.categoryTitle || 'Categories'}</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer group py-2">
                        <input
                          type="radio"
                          name="category-mobile"
                          value=""
                          checked={selectedCategory === ''}
                          onChange={() => setSelectedCategory('')}
                          className="w-5 h-5 text-primary cursor-pointer"
                        />
                        <span className="text-text-light group-hover:text-primary">All Categories</span>
                      </label>
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group py-2">
                          <input
                            type="radio"
                            name="category-mobile"
                            value={cat.name}
                            checked={selectedCategory === cat.name}
                            onChange={() => setSelectedCategory(cat.name)}
                            className="w-5 h-5 text-primary cursor-pointer"
                          />
                          <span className="text-text-light group-hover:text-primary">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3 text-secondary">{shopContent.priceTitle || 'Price Range'}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-light">₹{priceRange[0]}</span>
                        <span className="text-text-light">₹{priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="w-full py-4 bg-primary text-secondary rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-colors touch-manipulation"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block lg:w-64 space-y-6 shrink-0"
          >
            <div className="sticky top-20">
              <div className="bg-white p-6 rounded-lg shadow-elegant">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg flex items-center text-secondary">
                    <SlidersHorizontal className="w-5 h-5 mr-2 text-primary" />
                    {shopContent.filterTitle || 'Filters'}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-secondary">{shopContent.categoryTitle || 'Categories'}</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value=""
                          checked={selectedCategory === ''}
                          onChange={() => setSelectedCategory('')}
                          className="w-5 h-5 text-primary cursor-pointer"
                        />
                        <span className="text-text-light group-hover:text-primary transition-colors">
                          All Categories
                        </span>
                      </label>
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="category"
                            value={cat.name}
                            checked={selectedCategory === cat.name}
                            onChange={() => setSelectedCategory(cat.name)}
                            className="w-5 h-5 text-primary cursor-pointer"
                          />
                          <span className="text-text-light group-hover:text-primary transition-colors">
                            {cat.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3 text-secondary">{shopContent.priceTitle || 'Price Range'}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-light">₹{priceRange[0]}</span>
                        <span className="text-text-light">₹{priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-lg shadow-elegant border border-border/40">
              <p className="text-text-light font-medium text-sm sm:text-base">
                <span className="text-primary font-bold">{sortedProducts.length}</span> {shopContent.productsFound || 'products found'}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-text-light hidden sm:inline-block">
                  {shopContent.sortTitle || 'Sort By'}:
                </span>
                <select
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-secondary font-bold text-sm touch-manipulation transition-all cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-border/60"
              >
                <p className="text-text-light text-lg font-medium">{shopContent.noProducts || 'No products found'}</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {sortedProducts.map((product) => (
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
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}