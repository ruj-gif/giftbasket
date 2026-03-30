import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeAdminAuthFromUrl } from '@qobo/admin-auth';

// CONTEXTS
import { CartProvider } from './contexts/CartContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { UserProvider } from './contexts/UserContext';
import { WishlistProvider } from "./contexts/WishlistContext";

// COMPONENTS
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// PAGES
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import MyOrdersPage from './pages/MyOrdersPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

// NEW PAGES
import WishlistPage from "./pages/WishlistPage";
import CustomForm from "./pages/CustomForm";

// ADMIN
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsList from './pages/admin/ProductsList';
import ProductForm from './pages/admin/ProductForm';
import CategoriesList from './pages/admin/CategoriesList';
import CategoryForm from './pages/admin/CategoryForm';
import OrdersList from './pages/admin/OrdersList';
import OrderDetail from './pages/admin/OrderDetail';
import ContactMessagesList from './pages/admin/ContactMessagesList';
import ContactMessageDetail from './pages/admin/ContactMessageDetail';
import HeroSectionsList from './pages/admin/HeroSectionsList';
import HeroSectionForm from './pages/admin/HeroSectionForm';
import FeatureBlocksList from './pages/admin/FeatureBlocksList';
import FeatureBlockForm from './pages/admin/FeatureBlockForm';
import SettingsPage from './pages/admin/SettingsPage';
import PaymentSettingsPage from './pages/admin/PaymentSettingsPage';

// CONFIG
import { siteConfig } from './config/siteConfig';

function ThemeInjector() {
  useEffect(() => {
    const root = document.documentElement;
    const { theme } = siteConfig;

    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        if (value) root.style.setProperty(`--${key}`, value);
      });
    }
  }, []);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  useEffect(() => {
    initializeAdminAuthFromUrl();
  }, []);

  return (
    <SettingsProvider>
      <ThemeInjector />
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <AnimatedRoutes />
            </Router>
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </SettingsProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ✅ PUBLIC ROUTES */}
        <Route path="/" element={<PageWrapper><Navigation /><HomePage /><Footer /></PageWrapper>} />
        <Route path="/shop" element={<PageWrapper><Navigation /><ShopPage /><Footer /></PageWrapper>} />
        <Route path="/product/:slug" element={<PageWrapper><Navigation /><ProductDetailPage /><Footer /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Navigation /><CartPage /><Footer /></PageWrapper>} />

        {/* ✅ FIXED CHECKOUT ROUTE (ONLY ONE) */}
        <Route path="/checkout" element={<PageWrapper><Navigation /><CheckoutPage /><Footer /></PageWrapper>} />

        <Route path="/order-confirmation/:orderId" element={<PageWrapper><Navigation /><OrderConfirmationPage /><Footer /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><Navigation /><AboutPage /><Footer /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Navigation /><LoginPage /><Footer /></PageWrapper>} />
        <Route path="/account" element={<PageWrapper><Navigation /><AccountPage /><Footer /></PageWrapper>} />
        <Route path="/my-orders" element={<PageWrapper><Navigation /><MyOrdersPage /><Footer /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Navigation /><ContactPage /><Footer /></PageWrapper>} />

        {/* ✅ EXTRA PAGES */}
        <Route path="/wishlist" element={<PageWrapper><Navigation /><WishlistPage /><Footer /></PageWrapper>} />
        <Route path="/customize" element={<PageWrapper><Navigation /><CustomForm /><Footer /></PageWrapper>} />

        {/* ✅ ADMIN */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm />} />

          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/new" element={<CategoryForm />} />
          <Route path="categories/:id" element={<CategoryForm />} />

          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrderDetail />} />

          <Route path="contact-messages" element={<ContactMessagesList />} />
          <Route path="contact-messages/:id" element={<ContactMessageDetail />} />

          <Route path="hero-sections" element={<HeroSectionsList />} />
          <Route path="hero-sections/new" element={<HeroSectionForm />} />
          <Route path="hero-sections/:id" element={<HeroSectionForm />} />

          <Route path="feature-blocks" element={<FeatureBlocksList />} />
          <Route path="feature-blocks/new" element={<FeatureBlockForm />} />
          <Route path="feature-blocks/:id" element={<FeatureBlockForm />} />

          <Route path="settings" element={<SettingsPage />} />
          <Route path="payment-settings" element={<PaymentSettingsPage />} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
}