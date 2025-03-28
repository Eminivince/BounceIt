import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AsideNav from '../Component/AsideNav';
import RightSection from '../Component/RightSection';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleLike, setActiveComments, setShowShareMenu, addComment, sharePost, selectAllPosts, selectLikedPosts, selectActiveComments, selectShowShareMenu } from '../store/slices/postSlice';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const posts = useSelector(selectAllPosts);
  const likedPosts = useSelector(selectLikedPosts);
  const activeComments = useSelector(selectActiveComments);
  const showShareMenu = useSelector(selectShowShareMenu);

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    setSelectedMedia([...selectedMedia, ...newMedia]);
  };

  const removeMedia = (index) => {
    setSelectedMedia(prev => {
      const newMedia = [...prev];
      URL.revokeObjectURL(newMedia[index].preview);
      newMedia.splice(index, 1);
      return newMedia;
    });
  };

  const handlePost = async () => {
    if (!postText.trim() && selectedMedia.length === 0) return;

    try {
      setUploadProgress(0);
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      // Here you would typically upload the media files and create the post
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(interval);
      setUploadProgress(100);

      // Clear the form
      setPostText('');
      selectedMedia.forEach(media => URL.revokeObjectURL(media.preview));
      setSelectedMedia([]);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = (postId) => {
    dispatch(toggleLike(postId));
  };

  const handleComment = (postId) => {
    dispatch(setActiveComments(activeComments === postId ? null : postId));
    setCommentText('');
  };

  const handleShare = (postId) => {
    dispatch(setShowShareMenu(showShareMenu === postId ? null : postId));
  };

  const submitComment = (postId) => {
    if (!commentText.trim()) return;
    dispatch(addComment({ postId, comment: commentText }));
    setCommentText('');
    dispatch(setActiveComments(null));
  };

  const handleUserClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 pb-20">
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
          <h1 className="text-xl font-bold text-white">BounceIt</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        <div className="max-w-2xl mx-auto py-4 px-4">
          <div className="mb-4">
            <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Compose new post..."
                className="w-full resize-none focus:outline-none bg-gray-800 text-gray-200 placeholder-gray-500"
                rows="4"
              />
              <div className="mt-4 space-y-4">
                {/* Media Preview */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    id="media-upload"
                    onChange={handleMediaUpload}
                    multiple
                  />
                  {selectedMedia.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {selectedMedia.map((media, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden">
                          {media.type === 'image' ? (
                            <img
                              src={media.preview}
                              alt="Upload preview"
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <video
                              src={media.preview}
                              className="w-full h-48 object-cover"
                              controls
                            />
                          )}
                          <motion.button
                            onClick={() => removeMedia(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            ✕
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  )}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-4">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.label
                      htmlFor="media-upload"
                      className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      📎
                    </motion.label>
                    <motion.button
                      className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      📋
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🖼️
                    </motion.button>
                    <motion.button
                      className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Aa
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={handlePost}
                    disabled={uploadProgress > 0 && uploadProgress < 100}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${uploadProgress > 0 && uploadProgress < 100 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    whileHover={uploadProgress === 0 ? { scale: 1.05 } : {}}
                    whileTap={uploadProgress === 0 ? { scale: 0.95 } : {}}
                  >
                    {uploadProgress > 0 && uploadProgress < 100 ? 'Posting...' : 'Post'}
                  </motion.button>
                </div>
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
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => handleUserClick(post.user.username)}
                  />
                  <div className="cursor-pointer" onClick={() => handleUserClick(post.user.username)}>
                    <h3 className="font-medium text-white">{post.user.name}</h3>
                    <p className="text-sm text-gray-400">{post.user.username} · {post.timestamp}</p>
                  </div>
                </div>

                <p className="px-4 mb-3 text-gray-300">{post.content}</p>

                <div className="relative bg-black group" onMouseEnter={() => setHoveredVideo(post.id)} onMouseLeave={() => setHoveredVideo(null)}>
                  <img
                    src={post.thumbnail}
                    alt={`${post.user.name}'s video thumbnail`}
                    className={`w-full h-full object-contain ${hoveredVideo === post.id ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  />
                  <video
                    src={post.video}
                    className={`absolute inset-0 w-full h-full object-contain ${hoveredVideo === post.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    autoPlay={hoveredVideo === post.id}
                    loop
                    playsInline
                    controls={hoveredVideo === post.id}
                    preload="metadata"
                    
                  />
                  {hoveredVideo !== post.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center group-hover:bg-opacity-70 transition-all">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.span
                        animate={{
                          scale: likedPosts.includes(post.id) ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {likedPosts.includes(post.id) ? '❤️' : '🤍'}
                      </motion.span>
                      <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleComment(post.id)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-blue-500"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </motion.button>
                    <motion.div className="relative">
                      <motion.button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-blue-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span>↗️</span>
                        <span>{post.shares}</span>
                      </motion.button>
                      <AnimatePresence>
                        {showShareMenu === post.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg p-2 min-w-[150px]"
                          >
                            <div className="space-y-2">
                              <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded">Copy Link</button>
                              <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded">Share to Twitter</button>
                              <button className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded">Share to Facebook</button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {activeComments === post.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-700 pt-4 space-y-4">
                          <div className="flex space-x-2">
                            <img
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop"
                              alt="Your avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1 flex space-x-2">
                              <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <motion.button
                                onClick={() => submitComment(post.id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Post
                              </motion.button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            {/* Example comments */}
                            <div className="flex space-x-2">
                              <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
                                alt="Commenter avatar"
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                                <p className="font-medium text-white">Sarah Dance</p>
                                <p className="text-gray-300">Amazing performance! 🔥</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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