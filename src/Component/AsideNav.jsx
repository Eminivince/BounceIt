import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AsideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { icon: "🏠", label: "Home", path: "/main" },
    { icon: "🔔", label: "Notifications", path: "/notifications" },
    { icon: "💬", label: "Messages", path: "/messages" },
    { icon: "📑", label: "Collections", path: "/collections" },
    { icon: "👥", label: "Subscriptions", path: "/subscriptions" },
    { icon: "💳", label: "Add card", path: "/add-card" },
    { icon: "👤", label: "My profile", path: "/profile" },
    { icon: "⋯", label: "More", path: "/more" },
  ];

  const mobileNavItems = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      // label: 'Home',
      path: '/main'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      // label: 'Search',
      action: () => setShowSearch(true)
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      // label: 'Notifications',
      path: '/notifications'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      // label: 'Messages',
      path: '/messages'
    },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic here
  };

  return (
    <>
      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-50 bg-gray-900 bg-opacity-95 p-4 shadow-lg"
          >
            <div className="relative flex items-center z-9999">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for people..."
                className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <span className="absolute left-3 text-gray-400">🔍</span>
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-3 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block w-64 h-screen fixed left-0 top-0 p-4 border-r border-gray-700 bg-gray-900"
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 ${location.pathname === item.path ? 'bg-gray-800' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-300">{item.label}</span>
            </motion.button>
          ))}
          <motion.button 
            className="mt-4 bg-blue-600 text-white rounded-full py-3 px-6 w-full hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.1 }}
          >
            NEW POST
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50"
      >
        <div className="flex justify-around items-center h-16">
          {mobileNavItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => item.action ? item.action() : navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-400'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default AsideNav;