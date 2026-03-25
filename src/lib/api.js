// src/lib/api.js

// Helper: Get data from Local Storage
const getLocal = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Helper: Save data to Local Storage
const setLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  products: {
    // Get all 20 mugs
    getAll: async () => {
      return { success: true, data: getLocal('my_products') };
    },
    // Add a new mug
    create: async (productData) => {
      try {
        const products = getLocal('my_products');
        const newProduct = { 
          ...productData, 
          id: Date.now(), // Unique ID for each mug
          price: Number(productData.price) || 0,
          image: productData.image_url || productData.image // Matches ProductCard logic
        };
        products.push(newProduct);
        setLocal('my_products', products);
        return { success: true };
      } catch (err) {
        return { success: false, message: err.message };
      }
    },
    delete: async (id) => {
      const products = getLocal('my_products').filter(p => p.id !== id);
      setLocal('my_products', products);
      return { success: true };
    }
  },
  categories: {
    getAll: async () => {
      return { success: true, data: getLocal('my_categories') };
    },
    create: async (categoryData) => {
      const categories = getLocal('my_categories');
      categories.push({ ...categoryData, id: Date.now() });
      setLocal('my_categories', categories);
      return { success: true };
    }
  }
};