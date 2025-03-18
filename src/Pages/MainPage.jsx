import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';
import { posts } from '../assets/UserData';

const MainPage = () => {
  const navigate = useNavigate();
  const [hoveredVideo, setHoveredVideo] = useState(null);

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
          <h1 className="text-xl font-bold text-white">Home</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        <div className="max-w-2xl mx-auto py-4 px-4">
          <div className="mb-4">
            <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <textarea
                placeholder="Compose new post..."
                className="w-full resize-none focus:outline-none bg-gray-800 text-gray-200 placeholder-gray-500"
                rows="4"
              />
              <div className="flex items-center space-x-4 mt-4">
                <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                  📎
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                  📋
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                  🖼️
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                  Aa
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white whitespace-nowrap">
              All
            </button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-700 text-gray-300 whitespace-nowrap">
              ✏️ Following
            </button>
          </div>

          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <div className="p-4 flex items-center space-x-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-white">{post.user.name}</h3>
                    <p className="text-sm text-gray-400">{post.user.username} · {post.timestamp}</p>
                  </div>
                </div>

                <p className="px-4 mb-3 text-gray-300">{post.content}</p>

                <div className="relative aspect-video bg-black">
                  <div 
                    className="relative w-full h-full"
                    onMouseEnter={() => setHoveredVideo(post.id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                  >
                    {hoveredVideo === post.id ? (
                      <video
                        src={post.video}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <>
                        <img
                          src={post.thumbnail}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-4">
                            <svg
                              className="w-12 h-12 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                    <span>↗️</span>
                    <span>{post.shares}</span>
                  </button>
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

export default MainPage;