import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { clearAdminAuth } from '@qobo/admin-auth';
import AdminSidebar from './AdminSidebar';
import { Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      clearAdminAuth();
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden min-h-[100dvh]">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[70] bg-white rounded-lg p-2.5 shadow-lg border border-gray-200 touch-manipulation"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" aria-hidden="true" />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] lg:w-64
        transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-out bg-white shadow-xl lg:shadow-none
        flex flex-col h-screen min-h-0 overflow-hidden
        pt-[env(safe-area-inset-top)]
        shrink-0`}>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <AdminSidebar onNavigate={() => setMenuOpen(false)} onLogout={handleLogout} />
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain">
        <div className="p-4 sm:p-5 lg:p-6 pt-16 sm:pt-20 lg:pt-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}