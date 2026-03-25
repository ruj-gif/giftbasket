const BASE_URL = "http://localhost:5000/api"; 
// 👉 change this if your backend runs on different port

export const api = {
  // ================= AUTH =================
  auth: {
    register: async (userData) => {
      try {
        const res = await fetch(`${BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Register error:", error);
        return { success: false, message: "Register failed" };
      }
    },

    login: async (userData) => {
      try {
        const res = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Login failed" };
      }
    },
  },

  // ================= PRODUCTS =================
  products: {
    getAll: async (params = {}) => {
      try {
        const query = new URLSearchParams(params).toString();

        const res = await fetch(`${BASE_URL}/products?${query}`);
        const data = await res.json();

        return data;
      } catch (error) {
        console.error("Products fetch error:", error);
        return { success: false, data: [] };
      }
    },
  },

  // ================= HERO =================
  hero_sections: {
    getAll: async () => {
      try {
        const res = await fetch(`${BASE_URL}/hero`);
        const data = await res.json();

        return data;
      } catch (error) {
        console.error("Hero fetch error:", error);
        return { success: false, data: [] };
      }
    },
  },
};
