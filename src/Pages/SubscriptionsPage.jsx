import React from 'react';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';

const SubscriptionsPage = () => {
  const subscriptions = [
    {
      id: 1,
      creator: {
        name: "Sarah Dance",
        username: "@sarah_dance",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        followers: "125K",
        description: "Professional dancer & choreographer 💃"
      },
      recentPosts: 3,
      lastActive: "2h ago"
    },
    {
      id: 2,
      creator: {
        name: "Fitness Pro",
        username: "@fitnesspro",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        followers: "89K",
        description: "Daily workout routines & fitness tips 💪"
      },
      recentPosts: 5,
      lastActive: "1h ago"
    },
    {
      id: 3,
      creator: {
        name: "Cooking Master",
        username: "@cookingmaster",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        followers: "200K",
        description: "Sharing healthy & delicious recipes 🥗"
      },
      recentPosts: 2,
      lastActive: "4h ago"
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
          <h1 className="text-xl font-bold text-white">Subscriptions</h1>
          <div className="w-8"></div>
        </div>

        <div className="max-w-2xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-6 text-white hidden md:block">Subscriptions</h1>
          
          <div className="space-y-6">
            {subscriptions.map(sub => (
              <div key={sub.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                  <img
                    src={sub.creator.avatar}
                    alt={sub.creator.name}
                    className="w-16 h-16 rounded-full mx-auto md:mx-0 mb-4 md:mb-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
                      <div>
                        <h3 className="font-medium text-lg text-white">{sub.creator.name}</h3>
                        <p className="text-gray-400">{sub.creator.username}</p>
                      </div>
                      <button className="mt-3 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 w-full md:w-auto">
                        Subscribed
                      </button>
                    </div>
                    <p className="text-gray-300 mt-2">{sub.creator.description}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mt-3 text-sm text-gray-400">
                      <span>{sub.creator.followers} followers</span>
                      <span className="hidden md:inline">•</span>
                      <span>{sub.recentPosts} new posts</span>
                      <span className="hidden md:inline">•</span>
                      <span>Active {sub.lastActive}</span>
                    </div>
                  </div>
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

export default SubscriptionsPage;