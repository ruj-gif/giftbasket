import { supabase } from "./supabase";

/* ================= PRODUCTS ================= */

const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*"); // simple fetch

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error("PRODUCT ERROR:", err.message);
    return { success: false, data: [] };
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
    console.error("SETTINGS ERROR:", err.message);
    return { success: false, data: {} };
  }
};

const updateSettings = async (payload) => {
  const { data: existing } = await supabase
    .from("settings")
    .select("id")
    .limit(1)
    .single();

  const { error } = await supabase
    .from("settings")
    .update(payload)
    .eq("id", existing.id);

  if (error) {
    console.error(error.message);
    return { success: false };
  }

  return { success: true };
};
/* ================= EXPORT ================= */

export const api = {
  products: {
    getAll: getAllProducts,
  },

  categories: {
    getAll: getAllCategories,
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
};