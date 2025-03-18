import React from 'react';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';

const MessagesPage = () => {
  const messages = [
    {
      id: 1,
      user: {
        name: "Sarah Dance",
        username: "@sarah_dance",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        online: true
      },
      lastMessage: "Hey! Thanks for following my dance tutorials! 💃",
      timestamp: "2h ago",
      unread: 2
    },
    {
      id: 2,
      user: {
        name: "Fitness Pro",
        username: "@fitnesspro",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        online: false
      },
      lastMessage: "The workout plan has been updated!",
      timestamp: "1d ago",
      unread: 0
    },
    {
      id: 3,
      user: {
        name: "Cooking Master",
        username: "@cookingmaster",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        online: true
      },
      lastMessage: "I'll share the recipe with you soon 🥗",
      timestamp: "2d ago",
      unread: 0
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AsideNav />
      
      <main className="flex-1 ml-64 mr-80">
        <div className="max-w-2xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Messages</h1>
          
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {message.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-white">{message.user.name}</h3>
                      <span className="text-sm text-gray-400">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{message.lastMessage}</p>
                  </div>
                </div>
                {message.unread > 0 && (
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {message.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <RightSection />
    </div>
  );
};

export default MessagesPage;