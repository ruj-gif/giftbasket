import React, { useState } from "react";
import { categories } from "../data/categories";

export default function Sidebar({ setSelectedCategory, setSelectedSub }) {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div
      style={{
        width: "250px",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        borderRight: "1px solid #ddd",
        padding: "15px",
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Categories</h3>

      {categories.map((cat) => (
        <div key={cat.name}>
          {/* MAIN CATEGORY */}
          <div
            onClick={() => {
              if (cat.sub.length > 0) {
                setOpenCategory(
                  openCategory === cat.name ? null : cat.name
                );
              } else {
                setSelectedCategory(cat.name);
                setSelectedSub(null);
              }
            }}
            style={{
              fontWeight: "bold",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {cat.name}
            {cat.sub.length > 0 && <span>+</span>}
          </div>

          {/* SUB CATEGORY */}
          {openCategory === cat.name && cat.sub.length > 0 && (
            <div style={{ marginLeft: "10px" }}>
              {cat.sub.map((sub) => (
                <div
                  key={sub}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedSub(sub);
                  }}
                  style={{
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "5px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "#000",
                    e.target.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent",
                    e.target.style.color = "#000")
                  }
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}