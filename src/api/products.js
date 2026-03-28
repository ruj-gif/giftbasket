import { supabase } from "../lib/supabase";

// ✅ GET ALL PRODUCTS
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

// ✅ UPLOAD IMAGE
export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    return null;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

// ✅ ADD PRODUCT
export const addProduct = async (product, file) => {
  const imageUrl = await uploadImage(file);

  if (!imageUrl) {
    alert("Image upload failed ❌");
    return;
  }

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        image: imageUrl
      }
    ]);

  if (error) {
    console.error("INSERT ERROR:", error.message, error);
    alert("Database insert failed ❌");
  }

  return data;
};

// ✅ DELETE PRODUCT
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) console.error(error);
};