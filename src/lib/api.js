import { supabase } from "./supabase";

/* ================= PRODUCTS ================= */

const getAllProducts = async (page = 1, limit = 10, search = "") => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("id", { ascending: false })
      .range(from, to);

    // ✅ SEARCH
    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { success: true, data: data || [], total: count || 0 };
  } catch (err) {
    console.error("PRODUCT ERROR:", err.message);
    return { success: false, data: [], total: 0 };
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

// ✅ UPDATE PRODUCT
const updateProduct = async (id, payload, file) => {
  try {
    let imageUrl = payload.image || null;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file, {
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        ...payload,
        image: imageUrl,
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



// ✅ CREATE PRODUCT (FIXED CLEAN VERSION)
const createProduct = async (product, file) => {
  try {
    let imageUrl = null;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file, {
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: product.name,
          price: Number(product.price),
          category: product.category,
          image: imageUrl, // ✅ correct
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

/* ================= AUTH (DB BASED) ================= */

// REGISTER
const register = async ({ email, password, name }) => {
  try {
    // check duplicate
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
    return { success: false, error: err.message };
  }
};

// LOGIN
const login = async ({ email, password }) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return { success: false, error: "Invalid credentials" };
    }

    localStorage.setItem("user", JSON.stringify(data));

    return { success: true, data };
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    return { success: false, error: err.message };
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

const createCategory = async (payload) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([payload])
      .select()
      .maybeSingle();

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("CREATE CATEGORY ERROR:", err.message);
    return { success: false, error: err.message };
  }
};

const deleteCategory = async (id) => {
  try {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err.message);
    return { success: false };
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

/* ================= CONTACT ================= */

const getAllContactMessages = async () => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*");

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
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
  } catch {
    return { success: false };
  }
};

/* ================= SETTINGS ================= */

const getSettings = async () => {
  const { data } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return { success: true, data: data || {} };
};

const updateSettings = async (payload) => {
  const { data: existing } = await supabase
    .from("settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (!existing) {
    await supabase.from("settings").insert([payload]);
  } else {
    await supabase.from("settings").update(payload).eq("id", existing.id);
  }

  return { success: true };
};

/* ================= ORDERS ================= */

const getAllOrders = async () => {
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: false });

  return { success: true, data: data || [] };
};

/* ================= EXPORT ================= */

export const api = {
  auth: {
    register,
    login,
  },

  products: {
    getAll: getAllProducts,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
  },

  categories: {
    getAll: getAllCategories,
    create: createCategory,
    delete: deleteCategory,
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