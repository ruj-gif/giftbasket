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

const LOCAL_PRODUCTS = [
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
    id: "p3",
    name: "Custom Photo Cushion",
    price: 450,
    category: "Personalise Cushion",
    image: "/products/cushions/2.png",
    rating: 4.9,
    isFavorite: false
  }
];

// ✅ helper
const getLocal = (key, initial) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initial;
};

// API
export const api = {
  categories: {
    getAll: async () => ({
      success: true,
      data: LOCAL_CATEGORIES
    })
  },

  products: {
    // ✅ GET
    getAll: async () => ({
      success: true,
      data: getLocal("my_products", LOCAL_PRODUCTS)
    }),

    // ✅ CREATE
    create: async (data) => {
      const products = getLocal("my_products", LOCAL_PRODUCTS);

      const newProduct = {
        ...data,
        id: Date.now().toString(),
        slug: data.name.toLowerCase().replace(/ /g, "-"),
        rating: 0,
        isFavorite: false
      };

      products.push(newProduct);

      localStorage.setItem("my_products", JSON.stringify(products));

      return { success: true, data: newProduct };
    },

    // ✅ UPDATE (FIXED)
    update: async (id, data) => {
      const products = getLocal("my_products", LOCAL_PRODUCTS);

      const updated = products.map(p =>
        p.id === id ? { ...p, ...data } : p
      );

      localStorage.setItem("my_products", JSON.stringify(updated));

      return { success: true };
    }
  },

  settings: {
    getAll: async () => ({
      success: true,
      data: {
        phone: "+919674243961",
        email: "giftbasketkolkata@gmail.com",
        address: "2, Abdul Halim Lane, Kolkata - 700 016"
      }
    })
  }
};