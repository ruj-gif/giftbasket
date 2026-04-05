import { supabase } from "../lib/supabase";

// GET ALL PRODUCTS
const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { success: false, data: [] };
  }

  return { success: true, data };
};

// UPLOAD IMAGE
const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file, {
  contentType: file.type,
});

  if (error) {
    console.error("UPLOAD ERROR:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

// CREATE PRODUCT ✅ (IMPORTANT)
const createProduct = async (product, file) => {
  try {
    console.log("START CREATE");

    const imageUrl = await uploadImage(file);
    console.log("IMAGE:", imageUrl);

    if (!imageUrl) throw new Error("Image upload failed");

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

    console.log("INSERT:", data, error);

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("FINAL ERROR:", err);
    alert(err.message);
    return { success: false };
  }
};

// DELETE
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

// ✅ EXPORT IN CORRECT FORMAT
export const api = {
  products: {
    getAll: getAllProducts,
    create: createProduct,   // 🔥 THIS FIXES YOUR ERROR
    delete: deleteProduct,
  },
};