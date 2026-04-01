import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FolderOpen, ShoppingCart, Mail, Image, Sparkles, Settings, CreditCard, LogOut } from 'lucide-react';

export default function AdminSidebar({ onNavigate, onLogout }) {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/categories', label: 'Categories', icon: FolderOpen },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/admin/contact-messages', label: 'Messages', icon: Mail },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="p-4">
      <div className="mb-8 px-4 py-3">
        <h2 className="font-display text-2xl font-bold text-primary">Admin Panel</h2>
        <p className="text-sm text-text-light">Store Admin</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path, item.exact)
                  ? 'bg-primary text-white font-semibold'
                  : 'text-text hover:bg-primary/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {onLogout && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              onNavigate?.();
              onLogout?.();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 rounded-lg font-medium touch-manipulation"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}