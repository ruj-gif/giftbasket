// Full Local Category List
const LOCAL_CATEGORIES = [
  
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

<<<<<<< HEAD
const LOCAL_PRODUCTS = [
=======
const INITIAL_PRODUCTS = [
  // 🟤 MUGS
>>>>>>> 406e895917de9ce0906b3f59d175bc6702a5ff65
  {
    id: "p1",
    name: "Customized Photo Frame",
    price: 599,
    category: "Personalise Photo Frame",
    image: "/products/photoframe/pf1.png",
    rating: 4.8,
    isFavorite: false
  },
  {
    id: "p2",
    name: "Personalised Magic Mug",
    price: 350,
    category: "Personalise Mug",
    image: "/products/mugs/mug1.png",
    rating: 4.5,
    isFavorite: true
  },
  {
<<<<<<< HEAD
    id: "p3",
    name: "Custom Photo Cushion",
    price: 450,
    category: "Personalise Cushion",
    image: "/products/cushions/cushion1.png",
    rating: 4.9,
    isFavorite: false
  }
];
=======
    id: 4,
    name: "Bf Mug",
    price: 250,
    category: "Personalise Mug",
    slug: "bf-mug",
    image: "/products/mugs/mug4.png"
  },

  // 🟡 CUSHIONS
  {
    id: 101,
    name: "Heart Shape Photo Cushion",
    price: 499,
    category: "Personalise Cushion",
    slug: "heart-photo-cushion",
    image: "/products/cushions/4.png"
  },
  {
    id: 102,
    name: "Square Fur Photo Cushion",
    price: 599,
    category: "Personalise Cushion",
    slug: "square-fur-cushion",
    image: "/products/cushions/2.png"
  },

  // 🟢 PHOTO FRAMES
  {
    id: 201,
    name: "Classic Wooden Photo Frame",
    price: 699,
    category: "Personalise Photo Frame",
    slug: "classic-photo-frame",
    image: "/products/frames/frame1.png"
  },
  {
    id: 202,
    name: "LED Photo Frame",
    price: 899,
    category: "Personalise Photo Frame",
    slug: "led-photo-frame",
    image: "/products/frames/frame2.png"
  },
  {
    id: 203,
    name: "Collage Photo Frame",
    price: 799,
    category: "Personalise Photo Frame",
    slug: "collage-frame",
    image: "/products/frames/frame3.png"
  }
];

const getLocal = (key, initial) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initial;
};
>>>>>>> 406e895917de9ce0906b3f59d175bc6702a5ff65


// Add this to your existing api.js
export const api = {
  categories: {
<<<<<<< HEAD
    getAll: async () => ({ success: true, data: LOCAL_CATEGORIES })
  },
  products: {
    getAll: async () => ({ success: true, data: LOCAL_PRODUCTS })
=======
    getAll: async () => ({
      success: true,
      data: getLocal('my_categories', INITIAL_CATEGORIES)
    })
  },
  products: {
    getAll: async () => ({
      success: true,
      data: getLocal('my_products', INITIAL_PRODUCTS)
    }),
    create: async (data) => {
      const products = getLocal('my_products', INITIAL_PRODUCTS);
      products.push({
        ...data,
        id: Date.now(),
        slug: data.name.toLowerCase().replace(/ /g, '-')
      });
      localStorage.setItem('my_products', JSON.stringify(products));
      return { success: true };
    }
>>>>>>> 406e895917de9ce0906b3f59d175bc6702a5ff65
  },
  // ADD THIS SECTION TO STOP THE ERROR:
  settings: {
<<<<<<< HEAD
    getAll: async () => ({ 
      success: true, 
      data: { 
        phone: "919876543210", // Your WhatsApp number
        email: "contact@example.com",
        address: "Your Shop Address"
      } 
=======
    getAll: async () => ({
      success: true,
      data: getLocal('my_settings', {})
>>>>>>> 406e895917de9ce0906b3f59d175bc6702a5ff65
    })
  }
};