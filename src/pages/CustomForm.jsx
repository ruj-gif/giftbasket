import React from "react";

export default function CustomForm() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-[#fff] flex items-center justify-center px-4 py-16">

      {/* CARD */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-100">

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2 italic">
          Customize Your Product
        </h2>

        <p className="text-center text-gray-500 mb-8 text-sm">
          Tell us your idea — we’ll create something beautiful for you
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const name = e.target.name.value;
            const phone = e.target.phone.value;
            const product = e.target.product.value;
            const message = e.target.message.value;

            const whatsappNumber = "919674243961";

            const text = `Hello, my name is ${name}
Phone: ${phone}
Product: ${product}

Customization Details:
${message}`;

            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

            window.open(url, "_blank");
          }}
          className="space-y-5"
        >

          {/* INPUTS */}
          <input
            name="name"
            placeholder="Your Name"
            required
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black/20"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black/20"
          />

          <input
            name="product"
            placeholder="Which product?"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black/20"
          />

          <textarea
            name="message"
            placeholder="Describe your customization..."
            rows="4"
            className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black/20"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-green-600 text-white font-semibold tracking-wide shadow-md hover:bg-green-700 transition"
          >
            Send on WhatsApp
          </button>

        </form>
      </div>
    </div>
  );
}