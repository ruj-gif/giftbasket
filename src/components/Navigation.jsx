import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Menu, X, ShoppingBag } from "lucide-react"; // ✅ changed

function Navigation() {
  const { cartCount } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userChanged", updateUser);
    return () => window.removeEventListener("userChanged", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/90 backdrop-blur-md border-b border-[#eee] sticky top-0 z-[1000]">

      {/* LOGO */}
      <div className="font-bold text-xl">
        <Link to="/" className="text-[#333]">Gift Basket</Link>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center gap-4">

        {/* CART */}
        <Link to="/cart" className="relative">
          <div className="relative w-[28px] h-[28px] flex items-center justify-center border rounded-md">
            <ShoppingBag size={18} /> {/* ✅ updated */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {/* AVATAR */}
        {user && (
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
            >
              {user.name?.charAt(0) || "U"}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border shadow-md rounded w-40 z-50">
                <div
                  onClick={() => {
                    navigate("/my-orders");
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Orders
                </div>

                <div
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}

        {!user && <Link to="/login">Login</Link>}

        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* DESKTOP */}
      <div className={`${isMobileOpen ? "flex" : "hidden"} md:flex gap-6 items-center`}>

        {["Home", "About", "Shop", "Wishlist", "Customize", "Contact"].map((item, i) => (
          <Link
            key={i}
            to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
          >
            {item}
          </Link>
        ))}

        {/* LOGIN / AVATAR */}
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
            >
              {user.name?.charAt(0) || "U"}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border shadow-md rounded w-40 z-50">
                <div
                  onClick={() => {
                    navigate("/my-orders");
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Orders
                </div>

                <div
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}

        {/* CART */}
        <Link to="/cart" className="relative">
          <ShoppingBag size={20} /> {/* ✅ updated */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}

export default Navigation;