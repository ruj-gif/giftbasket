import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const navigate = useNavigate();

  

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src="/welcome page.png"
          alt="Welcome"
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/70" />

      {/* GLOW */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full"></div>
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-10 h-full flex flex-col items-center justify-center gap-6"
      >
        <button
          onClick={() => navigate("/home")}
          className="px-12 py-4 bg-white/90 backdrop-blur-md text-black uppercase tracking-[0.3em] text-sm font-medium
          hover:bg-white transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
        >
          Enter Store
        </button>

        <p className="text-white/70 text-xs tracking-[0.3em] uppercase">
          Luxury Gifting Experience
        </p>
      </motion.div>

    </div>
  );
}