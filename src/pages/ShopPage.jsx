import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { categories as categoryConfig } from '../config/categories';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.products.getAll({ published: true });
      if (res.success) setProducts(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTER
  const filteredProducts = products.filter((p) => {
    const categoryMatch =
      (!selectedCategory || p.category === selectedCategory) &&
      (!selectedSubcategory || p.subcategory === selectedSubcategory);

    const price = Number(p.discount_price || p.price || 0);
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];

    return categoryMatch && priceMatch;
  });

  // 🔥 SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(a.discount_price || a.price || 0);
    const priceB = Number(b.discount_price || b.price || 0);

    if (sortBy === 'price_low') return priceA - priceB;
    if (sortBy === 'price_high') return priceB - priceA;
    return 0;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#fafafa] py-10">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-8"
        >
          Shop
        </motion.h1>

        <div className="flex gap-8">

          {/* 🔥 PREMIUM SIDEBAR */}
          <div className="hidden lg:block w-72 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border">

            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <SlidersHorizontal size={18} /> Filters
            </h3>

            {/* CATEGORIES */}
            {categoryConfig.map((cat) => (
              <div key={cat.name} className="mb-5">

                <h4
                  className={`font-semibold cursor-pointer transition ${
                    selectedCategory === cat.name
                      ? 'text-red-600'
                      : 'text-gray-800'
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedSubcategory('');
                  }}
                >
                  {cat.name}
                </h4>

                {cat.subcategories?.map((sub) => (
                  <p
                    key={sub}
                    className={`ml-4 text-sm cursor-pointer mt-1 ${
                      selectedSubcategory === sub
                        ? 'text-red-500 font-medium'
                        : 'text-gray-500 hover:text-black'
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSelectedSubcategory(sub);
                    }}
                  >
                    {sub}
                  </p>
                ))}
              </div>
            ))}

            {/* PRICE */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Price</h4>
              <input
                type="range"
                min="0"
                max="30000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, Number(e.target.value)])
                }
                className="w-full accent-red-600"
              />
              <p className="text-sm text-gray-500 mt-1">
                Up to ₹{priceRange[1]}
              </p>
            </div>

          </div>

          {/* 🔥 PRODUCTS */}
          <div className="flex-1">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border">

              <p className="text-gray-600">
                <span className="font-bold text-black">
                  {sortedProducts.length}
                </span>{' '}
                products
              </p>

              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low → High</option>
                <option value="price_high">Price: High → Low</option>
              </select>

            </div>

            {/* GRID */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.03 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}