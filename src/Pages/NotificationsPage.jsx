import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';
import { motion } from 'framer-motion';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Dance",
        username: "@sarah_dance",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      action: "liked your post",
      timestamp: "2h ago"
    },
    {
      id: 2,
      user: {
        name: "Fitness Pro",
        username: "@fitnesspro",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
      },
      action: "started following you",
      timestamp: "4h ago"
    },
    {
      id: 3,
      user: {
        name: "Cooking Master",
        username: "@cookingmaster",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      },
      action: "commented on your post",
      timestamp: "6h ago"
    }
  ]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AsideNav />
      
      <main className="flex-1 md:ml-64 md:mr-80">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-40">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => navigate('/profile')}
          />
          <h1 className="text-xl font-bold text-white">Notifications</h1>
          <div className="w-8"></div>
        </div>

        <div className="max-w-2xl mx-auto py-4 px-4">
          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <motion.button
              onClick={() => setNotifications([])}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {notifications.map(notification => (
              <motion.div
                key={notification.id}
                className="flex items-center space-x-4 p-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-200 truncate">
                    <span className="font-medium text-white">{notification.user.name}</span>
                    {' '}{notification.action}
                  </p>
                  <p className="text-sm text-gray-400">{notification.timestamp}</p>
                </div>
              </motion.div>
            ))}

            {notifications.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No notifications yet
              </div>
            )}
          </div>

          {/* Mobile Clear All Button */}
          {notifications.length > 0 && (
            <motion.button
              onClick={() => setNotifications([])}
              className="md:hidden w-full mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          )}
        </div>
      </main>

      <RightSection />
    </div>
  );
};

export default NotificationsPage;