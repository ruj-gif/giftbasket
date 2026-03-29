import { supabase } from "./supabase";

/* ================= PRODUCTS ================= */

const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return { success: false, data: [] };
  }

  return { success: true, data };
};

/* ================= CATEGORIES ================= */

const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories") // 🔥 MAKE SURE TABLE EXISTS
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
    console.error(error);
    throw error;
  }
};

// ================= AUTH =================

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
      data: {
        name,
      },
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
  auth: {
    login,
    register,}
};