import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Menu, X } from "lucide-react";

function Navigation() {
  const { cartCount } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ✅ USER STATE (important)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // ✅ LISTEN FOR LOGIN CHANGE
  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userChanged", updateUser);

    return () => window.removeEventListener("userChanged", updateUser);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/90 backdrop-blur-md border-b border-[#eee] sticky top-0 z-[1000]">
     
      {/* LOGO */}
      <div className="font-bold text-xl tracking-[0.5px]">
        <Link to="/" className="text-[#333] no-underline">Gift Basket</Link>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center gap-4">
        
        {/* CART */}
        <Link to="/cart" className="relative no-underline">
          <div className="relative w-[28px] h-[28px] flex items-center justify-center border-[1.5px] border-[#333] rounded-md group hover:bg-[#111] hover:border-[#111]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-[6px] -right-[6px] bg-[#111] text-white text-[10px] rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {/* ✅ AVATAR (MOBILE AFTER LOGIN) */}
        {user && (
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
            {user.name?.charAt(0) || "U"}
          </div>
        )}

        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* LINKS */}
      <div
        className={`${
          isMobileOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 gap-6 md:gap-[30px] items-center`}
      >
        {["Home", "About", "Shop", "Wishlist", "Customize"].map((item, i) => (
          <Link
            key={i}
            to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
            onClick={() => setIsMobileOpen(false)}
            className="text-[#333] text-sm font-medium hover:text-[#e11d48]"
          >
            {item}
          </Link>
        ))}

        {/* ✅ LOGIN OR AVATAR */}
        {!user ? (
          <Link
            to="/login"
            className="text-[#333] text-sm font-medium hover:text-[#e11d48]"
          >
            Login
          </Link>
        ) : (
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            {user.name?.charAt(0) || "U"}
          </div>
        )}

        {/* CART DESKTOP */}
        <Link to="/cart" className="relative hidden md:block">
          <div className="relative w-[28px] h-[28px] flex items-center justify-center border-[1.5px] border-[#333] rounded-md group hover:bg-[#111] hover:border-[#111]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-[6px] -right-[6px] bg-[#111] text-white text-[10px] rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;