import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';
import { motion } from 'framer-motion';
import SubscriptionModal from '../Component/SubscriptionModal';
import { toggleFollow, toggleSubscription, selectIsFollowing, selectIsSubscribed, selectUserByUsername } from '../store/slices/userSlice';

const UserProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const isFollowing = useSelector(state => selectIsFollowing(state, username));
  const isSubscribed = useSelector(state => selectIsSubscribed(state, username));
  const profile = useSelector(state => selectUserByUsername(state, username));
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  if (!profile) {
    return <div>User not found</div>;
  }
  const stats = {
    posts: 234,
    followers: '125K',
    following: 156,
    likes: '450K'
  };

  const recentPosts = [
    {
      id: 1,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=600&h=400&fit=crop",
      views: "15.3K",
      timestamp: "2d ago",
    },
    {
      id: 2,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
      views: "12.8K",
      timestamp: "4d ago",
    },
    {
      id: 3,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
      views: "20.1K",
      timestamp: "1w ago",
    },
  ];

  const handleFollow = () => {
    dispatch(toggleFollow(username));
    // Here you would typically make an API call to follow/unfollow the user
  };

  const handleSubscribe = () => {
    if (isSubscribed) {
      dispatch(toggleSubscription(username));
    } else {
      setShowSubscriptionModal(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 pb-20">
      <AsideNav />
      
      <main className="flex-1 md:ml-64 md:mr-80">
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
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                <p className="text-gray-400">{profile.username}</p>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  onClick={handleFollow}
                  className={`px-4 py-2 rounded-full ${isFollowing ? 'bg-gray-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </motion.button>
                <motion.button
                  onClick={handleSubscribe}
                  className={`px-4 py-2 rounded-full ${isSubscribed ? 'bg-pink-600 text-white' : 'bg-gray-700 text-white'} hover:opacity-90`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </motion.button>
              </div>
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
                  <motion.div
                    key={post.id}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={post.thumbnail}
                      alt={`Post ${post.id}`}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-all text-center">
                        <p>👁️ {post.views}</p>
                        <p className="text-sm">{post.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <RightSection />
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        username={username}
      />
    </div>
  );
};

export default UserProfilePage;