// src/lib/api.js

const INITIAL_CATEGORIES = [
  { id: 1, name: "Personalised Gifts", slug: "personalised-gifts" },
  { id: 101, name: "Personalise Mug", slug: "personalise-mug", parentId: 1 },
  { id: 102, name: "Personalise Photo Frame", slug: "personalise-photo-frame", parentId: 1 },
  { id: 103, name: "Personalise Cushion", slug: "personalise-cushion", parentId: 1 },
  { id: 2, name: "Gift Hampers", slug: "gift-hampers" },
  { id: 201, name: "Birthday Hamper", slug: "birthday-hamper", parentId: 2 },
  { id: 3, name: "Corporate Gifts", slug: "corporate-gifts" },
  { id: 4, name: "Ready-to-get Gifts", slug: "ready-to-get" },
  { id: 5, name: "Gifts for Kids", slug: "kids-gifts" },
  { id: 6, name: "Trophies", slug: "trophies" },
  { id: 7, name: "Handicraft", slug: "handicraft" },
  { id: 8, name: "Home Decor", slug: "home-decor" },
  { id: 9, name: "Chocolate & Hampers", slug: "chocolates" },
  { id: 10, name: "Islamic Gifts", slug: "islamic-gifts" },
  { id: 11, name: "Stickers & Badges", slug: "stickers-badges" }
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Classic White Mug",
    price: 299,
    category: "Personalise Mug",
    slug: "classic-white-mug",
    image: "/products/mugs/mug1.png"
  },
  {
    id: 2,
    name: "Magic Color Changing Mug",
    price: 499,
    category: "Personalise Mug",
    slug: "magic-mug",
    image: "/products/mugs/mug2.png"
  },
  {
    id: 3,
    name: "Inner Color Mug",
    price: 350,
    category: "Personalise Mug",
    slug: "inner-color-mug",
    image: "/products/mugs/mug3.jpg"
  },
  // ADD THE REST OF YOUR 20 MUGS HERE FOLLOWING THIS PATTERN
  {
    id: 4,
    name: "Bf Mug",
    price: 250,
    category: "Personalise Mug",
    slug: "inner-color-mug",
    image: "/products/mugs/mug4.png"
  },
];

const getLocal = (key, initial) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initial;
};

export const api = {
  categories: {
    getAll: async () => ({ success: true, data: getLocal('my_categories', INITIAL_CATEGORIES) })
  },
  products: {
    getAll: async () => ({ success: true, data: getLocal('my_products', INITIAL_PRODUCTS) }),
    create: async (data) => {
      const products = getLocal('my_products', INITIAL_PRODUCTS);
      products.push({ ...data, id: Date.now(), slug: data.name.toLowerCase().replace(/ /g, '-') });
      localStorage.setItem('my_products', JSON.stringify(products));
      return { success: true };
    }
  },
  settings: {
    getAll: async () => ({ success: true, data: getLocal('my_settings', {}) })
  }
};