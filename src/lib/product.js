import { supabase } from "./supabase";

// GET PRODUCTS
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET ERROR:", error.message);
    return [];
  }

  return data;
};

// UPLOAD IMAGE
export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) {
    console.error("UPLOAD ERROR:", error.message);
    alert("Image upload failed ❌");
    return null;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

// ADD PRODUCT
export const addProduct = async (product, file) => {
  const imageUrl = await uploadImage(file);

  if (!imageUrl) return null;

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: product.name,
        price: Number(product.price),
        image: imageUrl,
        slug: product.slug,
      },
    ])
    .select();

  if (error) {
    console.error("INSERT ERROR:", error.message);
    return null; // ✅ IMPORTANT
  }

  return data;
};