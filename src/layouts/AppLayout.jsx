import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Landing page has a full-width immersive government banner, but still accessible via navigation
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#f8fafb] flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        
        <main className="flex-1 p-4 lg:p-7 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
