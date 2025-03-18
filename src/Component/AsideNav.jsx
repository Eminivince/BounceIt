import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const AsideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    { icon: '🏠', label: 'Home', path: '/main' },
    { icon: '🔍', label: 'Search', path: '/search' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
    { icon: '💬', label: 'Messages', path: '/messages' },
  ];

  return (
    <>
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
              onClick={() => navigate(item.path)}
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