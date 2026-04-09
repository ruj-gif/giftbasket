import { supabase } from "./supabase";

/* ================= PRODUCTS ================= */

const getAllProducts = async (page = 1, limit = null, search = "") => {
  try {
    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("id", { ascending: false });

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (limit) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return { success: true, data: data || [], total: count || 0 };
  } catch (err) {
    console.error("PRODUCT ERROR:", err.message);
    return { success: false, data: [], total: 0 };
  }
};

const getAllProductsSimple = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error("PRODUCT ERROR:", err.message);
    return { success: false, data: [] };
  }
};

const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err.message);
    return { success: false, data: null };
  }
};

/* ================= IMAGE ================= */

const uploadImage = async (file) => {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file, {
      contentType: file.type,
    });

  if (error) {
    console.error("IMAGE UPLOAD ERROR:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

/* ================= CREATE / UPDATE ================= */

const createProduct = async (product, file) => {
  try {
    const imageUrl = await uploadImage(file);

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: product.name,
          price: Number(product.price),
          category: product.category,
          image: imageUrl,
          description: product.description || "",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err.message);
    return { success: false };
  }
};

const updateProduct = async (id, payload, file) => {
  try {
    let imageUrl = payload.image || null;

    if (file) {
      imageUrl = await uploadImage(file);
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        name: payload.name,
        price: Number(payload.price),
        category: payload.category,
        image: imageUrl,
        description: payload.description || "",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err.message);
    return { success: false };
  }
};

const deleteProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) return { success: false };

  return { success: true };
};

/* ================= CATEGORIES ================= */

const getAllCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error(error.message);
    return { success: false, data: [] };
  }

  return { success: true, data: data || [] };
};

const createCategory = async (payload) => {
  const { data, error } = await supabase
    .from("categories")
    .insert([payload])
    .select()
    .maybeSingle();

  if (error) return { success: false };

  return { success: true, data };
};

const updateCategory = async (id, payload) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("CATEGORY UPDATE ERROR:", err.message);
    return { success: false };
  }
};

const deleteCategory = async (id) => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) return { success: false };

  return { success: true };
};

/* ================= CONTACT MESSAGES (FIXED) ================= */

const createContactMessage = async (payload) => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("CONTACT ERROR:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("CONTACT EXCEPTION:", err.message);
    return { success: false, error: err.message };
  }
};

const getAllContactMessages = async () => {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("id", { ascending: false });

  if (error) return { success: false, data: [] };

  return { success: true, data: data || [] };
};

const deleteContactMessage = async (id) => {
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) return { success: false };

  return { success: true };
};
const getContactMessageById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("GET CONTACT MESSAGE ERROR:", err.message);
    return { success: false, data: null };
  }
};

/* ================= ORDERS ================= */

const createOrder = async (payload) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err.message);
    return { success: false };
  }
};

const getAllOrders = async () => {
  const { data } = await supabase.from("orders").select("*");
  return { success: true, data: data || [] };
};

const getOrderById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch {
    return { success: false, data: null };
  }
};

/* ================= AUTH ================= */
const register = async ({ email, password, name }) => {
  try {
    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return { success: false, error: "User already exists" };
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password, name }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };

  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    return { success: false, error: "Registration failed" };
  }
};

const login = async ({ email, password }) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.trim().toLowerCase()) // ✅ FIX
      .eq("password", password)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return { success: false, error: "Invalid credentials" };
    }

    localStorage.setItem("user", JSON.stringify(data));
    window.dispatchEvent(new Event("userChanged"));

    return { success: true, data };
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    return { success: false, error: "Login failed" };
  }
};
/* ================= SETTINGS ================= */

const getSettings = async () => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("GET SETTINGS ERROR:", err.message);
    return { success: false, data: null };
  }
};

const updateSettings = async (payload) => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .update(payload)
      .eq("id", 1) // assuming single row
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("UPDATE SETTINGS ERROR:", err.message);
    return { success: false };
  }
};
/* ================= EXPORT ================= */

export const api = {
  auth: { register, login },

  products: {
    getAll: getAllProducts,
    getById: getProductById,
    getAllSimple: getAllProductsSimple,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
  },

  categories: {
    getAll: getAllCategories,
    create: createCategory,
    update: updateCategory,
    delete: deleteCategory,
  },

  contact_messages: {
  getAll: getAllContactMessages,
  getById: getContactMessageById, // ✅ ADD THIS
  create: createContactMessage,
  delete: deleteContactMessage,
},

  orders: {
    getAll: getAllOrders,
    getById: getOrderById,
    create: createOrder,
  },
  settings: {
  get: getSettings,
  update: updateSettings,
},
};