import { supabase } from "./supabase";

/* ================= PRODUCTS ================= */

const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error("PRODUCT ERROR:", err.message);
    return { success: false, data: [] };
  }
};

const updateProduct = async (id, payload) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(payload)
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

/* ================= CATEGORIES ================= */

const getAllCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error("CATEGORY ERROR:", err.message);
    return { success: false, data: [] };
  }
};

/* ================= HERO ================= */

const getAllHeroSections = async () => {
  try {
    const { data, error } = await supabase
      .from("hero")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error("HERO ERROR:", err.message);
    return { success: false, data: [] };
  }
};

const getHeroById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("hero")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("GET HERO ERROR:", err.message);
    return { success: false, data: null };
  }
};

const createHero = async (payload) => {
  try {
    const { data, error } = await supabase
      .from("hero")
      .insert([payload])
      .select()
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("CREATE HERO ERROR:", err.message);
    return { success: false, error: err.message };
  }
};

const updateHero = async (id, payload) => {
  try {
    const { data, error } = await supabase
      .from("hero")
      .update(payload)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("UPDATE HERO ERROR:", err.message);
    return { success: false, error: err.message };
  }
};

const deleteHeroSection = async (id) => {
  try {
    const { error } = await supabase
      .from("hero")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error("DELETE HERO ERROR:", err.message);
    return { success: false };
  }
};

const createProduct = async (product, file) => {
  const fileName = `${Date.now()}-${file.name}`;

  // upload image
  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  const imageUrl = urlData.publicUrl;

  // insert
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        image: imageUrl,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return { success: true, data };
};

/* ================= CONTACT MESSAGES ================= */

const getAllContactMessages = async () => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error("CONTACT MESSAGES ERROR:", err.message);
    return { success: false, data: [] };
  }
};

const deleteContactMessage = async (id) => {
  try {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error("DELETE MESSAGE ERROR:", err.message);
    return { success: false };
  }
};
/* ================= SETTINGS ================= */

const getSettings = async () => {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { success: true, data: data || {} };
  } catch (err) {
    console.error("GET SETTINGS ERROR:", err.message);
    return { success: false, data: {} };
  }
};

const updateSettings = async (payload) => {
  try {
    const { data: existing, error: fetchError } = await supabase
      .from("settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!existing) {
      const { error } = await supabase
        .from("settings")
        .insert([payload]);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("settings")
        .update(payload)
        .eq("id", existing.id);

      if (error) throw error;
    }

    return { success: true };
  } catch (err) {
    console.error("UPDATE SETTINGS ERROR:", err.message);
    return { success: false };
  }
};

/* ================= ORDERS ================= */

const getAllOrders = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error("ORDERS ERROR:", err.message);
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

const deleteProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return { success: false };
  }

  return { success: true };
};

/* ================= EXPORT ================= */

export const api = {
  products: {
    getAll: getAllProducts,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
  },

  categories: {
    getAll: getAllCategories,
  },

  orders: {
    getAll: getAllOrders,
  },

  settings: {
    get: getSettings,
    update: updateSettings,
  },

  hero_sections: {
    getAll: getAllHeroSections,
    getById: getHeroById,
    create: createHero,
    update: updateHero,
    delete: deleteHeroSection,
  },

  contact_messages: {
    getAll: getAllContactMessages,
    delete: deleteContactMessage,
  },
};