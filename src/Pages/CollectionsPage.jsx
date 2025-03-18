import React from 'react';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';

const CollectionsPage = () => {
  const collections = [
    {
      id: 1,
      title: "Favorite Dance Moves",
      description: "Best dance tutorials and routines",
      thumbnail: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=600&h=400&fit=crop",
      postCount: 12
    },
    {
      id: 2,
      title: "Workout Routines",
      description: "Daily exercise and fitness tips",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
      postCount: 8
    },
    {
      id: 3,
      title: "Healthy Recipes",
      description: "Nutritious and delicious meal ideas",
      thumbnail: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
      postCount: 15
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AsideNav />
      
      <main className="flex-1 ml-64 mr-80">
        <div className="max-w-2xl mx-auto py-4 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Collections</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              New Collection
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {collections.map(collection => (
              <div key={collection.id} className="border border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-gray-800">
                <div className="relative aspect-video">
                  <img
                    src={collection.thumbnail}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                    {collection.postCount} posts
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-white mb-1">{collection.title}</h3>
                  <p className="text-gray-400 text-sm">{collection.description}</p>
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

export default CollectionsPage;