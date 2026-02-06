import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Header({ onToggleSidebar }) {
  const { pathname } = useLocation();

  const getTitle = () => {
    const paths = pathname.split('/').filter(Boolean);
    if (paths.length === 0) return 'Dashboard';
    
    const lastPath = paths[paths.length - 1];
    return lastPath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Hamburger Button - mobile */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Page Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">{getTitle()}</h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari peserta, dokumen..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>

        {/* Notification Button */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Button */}
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-sm font-semibold text-gray-700 hidden lg:block">Admin</span>
        </button>
      </div>
    </header>
  );
}
