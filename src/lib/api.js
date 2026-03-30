import { supabase } from "./supabase";

/* ================= PRODUCTS ================= */

const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("PRODUCT ERROR:", error.message);
    return { success: false, data: [] };
  }

  return { success: true, data };
};

/* ================= CATEGORIES ================= */

const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("CATEGORY ERROR:", error.message);
    return { success: false, data: [] };
  }

  return { success: true, data };
};

const deleteCategory = async (id) => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE CATEGORY ERROR:", error.message);
    throw error;
  }
};

/* ================= ORDERS (🔥 ADD THIS) ================= */

// ✅ Get all orders (for logged-in user or admin)
const getAllOrders = async () => {
  const { data, error } = await supabase
    .from("orders") // 🔥 make sure this table exists
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("ORDER ERROR:", error.message);
    return { success: false, data: [] };
  }

  return { success: true, data };
};

// ✅ Get single order by ID (for tracking)
const getOrderById = async (id) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("TRACK ORDER ERROR:", error.message);
    return { success: false };
  }

  return { success: true, data };
};

/* ================= AUTH ================= */

const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error };
  }

  return { success: true, data: data.user };
};

const register = async ({ email, password, name }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { success: false, error };
  }

  return { success: true, data: data.user };
};

/* ================= EXPORT ================= */

export const api = {
  products: {
    getAll: getAllProducts,
  },

  categories: {
    getAll: getAllCategories,
    delete: deleteCategory,
  },

  // ✅ THIS FIXES YOUR ERROR
  orders: {
    getAll: getAllOrders,
    getById: getOrderById,
  },

  auth: {
    login,
    register,
  },
};