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
      
      <main className="flex-1 ml-64 mr-80">
        <div className="max-w-2xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Subscriptions</h1>
          
          <div className="space-y-6">
            {subscriptions.map(sub => (
              <div key={sub.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800 hover:bg-gray-700">
                <div className="flex items-start space-x-4">
                  <img
                    src={sub.creator.avatar}
                    alt={sub.creator.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg text-white">{sub.creator.name}</h3>
                        <p className="text-gray-400">{sub.creator.username}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                        Subscribed
                      </button>
                    </div>
                    <p className="text-gray-300 mt-2">{sub.creator.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                      <span>{sub.creator.followers} followers</span>
                      <span>•</span>
                      <span>{sub.recentPosts} new posts</span>
                      <span>•</span>
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