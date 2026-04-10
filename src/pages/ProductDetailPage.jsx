import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export default function ProductDetailPage() {
  const { slug } = useParams(); // ID
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    const res = await api.products.getAllSimple();

    if (res.success) {
      const found = res.data.find(
        (p) => String(p.id) === String(slug)
      );
      setProduct(found);
    }
  };

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  const isWishlisted = wishlist.find((i) => i.id === product.id);

  return (
    <div className="p-6 min-h-screen bg-[#fafafa]">

      <button
        onClick={() => navigate("/shop")}
        className="mb-4 text-sm text-gray-500"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 border">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={
              product.image
                ? product.image.startsWith("http")
                  ? product.image
                  : `${api.baseURL}${product.image}`
                : "/placeholder.png"
            }
            alt={product.name}
            className="w-full h-[500px] object-contain bg-white"
          />

          {/* ❤️ WISHLIST */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
          >
            <span
              className={
                isWishlisted
                  ? "text-red-500 text-xl"
                  : "text-gray-400 text-xl"
              }
            >
              ♥
            </span>
          </button>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl font-semibold mb-3">
            {product.name}
          </h1>

          <p className="text-gray-500 mb-4">
            {product.description || "No description available"}
          </p>

          <p className="text-xl font-bold mb-6">
            ₹{product.price}
          </p>

          {/* 🛒 CART BUTTON */}
          <button
            onClick={() => {
              if (status === "view") {
                navigate("/cart");
              } else {
                addToCart(product);
                setStatus("added");

                setTimeout(() => {
                  setStatus("view");
                }, 1200);
              }
            }}
            className={`w-full py-3 text-white ${
              status === "idle"
                ? "bg-black"
                : "bg-green-600"
            }`}
          >
            {status === "idle" && "Add to Cart"}
            {status === "added" && "Added"}
            {status === "view" && "View Cart"}
          </button>
        </div>

      </div>
    </div>
  );
}