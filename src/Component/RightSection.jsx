import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RightSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const suggestions = [
    {
      name: "Lil Kitty",
      username: "@lil_kitty_yy",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop",
    },
    {
      name: "Sonya May",
      username: "@sonya_olonka",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop",
    },
    {
      name: "Ariel Calista",
      username: "@aribete702",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=50&h=50&fit=crop",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed top-4 z-50 py-1 px-3 rounded-lg bg-blue-600 text-white shadow-lg ${
          isOpen ? "left-4" : "right-4"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? "✕" : "Suggested"}
      </motion.button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Right Section Panel */}
      <motion.div
        className={`fixed top-0 h-screen p-4 border-l border-gray-700 bg-gray-900 z-50 w-80 md:fixed md:right-0`}
        initial={{ x: 500 }}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : 500 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search posts"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </motion.div>

        <div className="mb-4">
          <motion.h2 
            className="text-gray-400 font-medium mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            SUGGESTIONS
          </motion.h2>
          <div className="space-y-4">
            {suggestions.map((user, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <p className="font-medium text-gray-200">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                  </div>
                </div>
                <motion.button 
                  className="text-blue-400 hover:text-blue-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Follow
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RightSection;
