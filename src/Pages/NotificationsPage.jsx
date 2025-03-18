import React from 'react';
import { useNavigate } from 'react-router-dom';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const notifications = [
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
  ];

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
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
        <div className="max-w-2xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Notifications</h1>
          
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-center space-x-4 p-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-gray-200">
                    <span className="font-medium text-white">{notification.user.name}</span>
                    {' '}{notification.action}
                  </p>
                  <p className="text-sm text-gray-400">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <RightSection />
    </div>
  );
};

export default NotificationsPage;