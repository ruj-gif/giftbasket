import React from "react";
import { useWishlist } from "../contexts/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div style={{ padding: "40px" }}>
      <h2>❤️ Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}