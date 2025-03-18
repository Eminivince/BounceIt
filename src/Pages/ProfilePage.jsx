import React, { useState } from 'react';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Fitness enthusiast | Dance lover | Healthy lifestyle advocate',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=300&fit=crop',
    location: 'New York, USA',
    website: 'www.johndoe.com',
    joinedDate: 'January 2023'
  });

  const stats = {
    posts: 156,
    followers: '10.5K',
    following: 234,
    likes: '25.6K'
  };

  const recentPosts = [
    {
      id: 1,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=600&h=400&fit=crop",
      video: "https://video.twimg.com/amplify_video/1881486762985312257/vid/avc1/718x1280/YlpuJRHrNyAxf1Jf.mp4?tag=14",
      views: "2.3K",
      timestamp: "2d ago"
    },
    {
      id: 2,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
      video: "https://video.twimg.com/amplify_video/1871405838163734528/vid/avc1/1080x1634/nBOyYCj4VF1qHol8.mp4?tag=16",
      views: "1.8K",
      timestamp: "4d ago"
    },
    {
      id: 3,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
      video: "https://video.twimg.com/amplify_video/1891530127806271489/vid/avc1/720x1280/UL9Gyopp6SuHAPpC.mp4?tag=14",
      views: "3.1K",
      timestamp: "1w ago"
    }
  ];

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    // Handle profile update logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-900 pb-20">
      <AsideNav />
      
      <main className="flex-1 md:ml-64 md:mr-80">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-40">
          <h1 className="text-xl font-bold text-white">{profile.name}</h1>
          <button
            onClick={handleEditProfile}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="max-w-2xl mx-auto py-4">
          {/* Cover Image */}
          <div className="relative h-36 md:h-48 rounded-lg overflow-hidden mb-16 md:mb-16">
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="absolute -bottom-8 left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-900"
            />
          </div>

          {/* Profile Info */}
          <div className="px-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white md:block hidden">{profile.name}</h1>
                <p className="text-gray-400">{profile.username}</p>
              </div>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hidden md:block"
              >
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>

            <p className="text-gray-300 mb-4">{profile.bio}</p>

            <div className="flex flex-wrap gap-y-2 gap-x-4 text-gray-400 text-sm mb-6">
              <span>📍 {profile.location}</span>
              <span>🔗 {profile.website}</span>
              <span>📅 Joined {profile.joinedDate}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:flex md:space-x-6 gap-4 mb-8">
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <span className="font-bold text-white block">{stats.posts}</span>
                <span className="text-gray-400">Posts</span>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <span className="font-bold text-white block">{stats.followers}</span>
                <span className="text-gray-400">Followers</span>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <span className="font-bold text-white block">{stats.following}</span>
                <span className="text-gray-400">Following</span>
              </div>
              <div className="text-center p-3 bg-gray-800 rounded-lg">
                <span className="font-bold text-white block">{stats.likes}</span>
                <span className="text-gray-400">Likes</span>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Recent Posts</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="relative rounded-lg overflow-hidden group cursor-pointer">
                    <div className="relative aspect-video">
                      {post.type === "video" ? (
                        <>
                          <img
                            src={post.thumbnail}
                            alt={`Post ${post.id}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <video
                              src={post.video}
                              className="w-full h-full object-cover"
                              loop
                            
                              playsInline
                              autoPlay={false}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-4xl">▶️</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={post.thumbnail}
                          alt={`Post ${post.id}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <div className="text-white text-sm flex items-center justify-end space-x-2">
                        <span>👁️ {post.views}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <RightSection />
    </div>
  );
};

export default ProfilePage;