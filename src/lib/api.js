import { supabase } from "./supabase";

/* ================= PRODUCTS ================= */

// ✅ GET ALL PRODUCTS
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

// ✅ GET PRODUCT BY ID
const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET PRODUCT ERROR:", error.message);
    return { success: false };
  }

  return { success: true, data };
};

// ✅ CREATE PRODUCT
const createProduct = async (productData, imageFile) => {
  let imageUrl = null;

  if (imageFile) {
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("products").insert([
    {
      ...productData,
      image: imageUrl,
    },
  ]);

  if (error) {
    console.error("CREATE PRODUCT ERROR:", error.message);
    throw error;
  }

  return { success: true };
};

// ✅ UPDATE PRODUCT
const updateProduct = async (id, updatedData, imageFile) => {
  let imageUrl = updatedData.image || null;

  // upload new image only if selected
  if (imageFile) {
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error(uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }

  const { error } = await supabase
    .from("products")
    .update({
      ...updatedData,
      image: imageUrl,
    })
    .eq("id", id);

  if (error) {
    console.error("UPDATE ERROR:", error.message);
    throw error;
  }

  return { success: true };
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

/* ================= ORDERS ================= */

const getAllOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("ORDER ERROR:", error.message);
    return { success: false, data: [] };
  }

  return { success: true, data };
};

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

  if (error) return { success: false, error };

  return { success: true, data: data.user };
};

const register = async ({ email, password, name }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) return { success: false, error };

  return { success: true, data: data.user };
};

/* ================= EXPORT ================= */

export const api = {
  products: {
    getAll: getAllProducts,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
  },

  categories: {
    getAll: getAllCategories,
    delete: deleteCategory,
  },

  orders: {
    getAll: getAllOrders,
    getById: getOrderById,
  },

  auth: {
    login,
    register,
  },
};