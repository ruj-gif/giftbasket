import React, { useState } from "react";

export default function CustomForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 YOUR WHATSAPP NUMBER (CHANGE THIS)
    const ownerNumber = "919674243961"; // include country code

    const text = `Hello! I want to customize a product:

Name: ${form.name}
Phone: ${form.phone}
Product: ${form.product}
Details: ${form.message}`;

    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>✨ Customize Your Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="product"
          placeholder="Which product?"
          required
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Describe your customization..."
          required
          onChange={handleChange}
          style={{ ...inputStyle, height: "100px" }}
        />

        <button type="submit" style={buttonStyle}>
          Send on WhatsApp 
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const buttonStyle = {
  background: "#25D366",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};