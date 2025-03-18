import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsideNav from "../Component/AsideNav";
import RightSection from "../Component/RightSection";
import { motion, AnimatePresence } from "framer-motion";
import videoframe_0 from "../assets/thumbnails/videoframe_0.png";

const MessagesPage = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const messages = [
    {
      id: 1,
      user: {
        name: "Sarah Dance",
        username: "@sarah_dance",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        online: true,
      },
      lastMessage: "Hey! Thanks for following my dance tutorials! 💃",
      timestamp: "2h ago",
      unread: 2,
      chatHistory: [
        {
          id: 1,
          text: "Hi! I love your dance tutorials!",
          sender: "me",
          timestamp: "2h ago",
        },
        {
          id: 2,
          text: "Hey! Thanks for following my dance tutorials! 💃",
          sender: "them",
          timestamp: "2h ago",
          media: null,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Fitness Pro",
        username: "@fitnesspro",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        online: false,
      },
      lastMessage: "The workout plan has been updated!",
      timestamp: "1d ago",
      unread: 0,
      chatHistory: [
        {
          id: 1,
          text: "Hey, how's the workout plan going?",
          sender: "them",
          timestamp: "2d ago",
        },
        {
          id: 2,
          text: "It's great! Making progress!",
          sender: "me",
          timestamp: "1d ago",
        },
        {
          id: 3,
          text: "Check out my latest workout!",
          sender: "them",
          timestamp: "1d ago",
          media: {
            type: "video",
            url: "https://video.twimg.com/amplify_video/1881486762985312257/vid/avc1/718x1280/YlpuJRHrNyAxf1Jf.mp4?tag=14",
            thumbnail: videoframe_0,
          },
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Cooking Master",
        username: "@cookingmaster",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        online: true,
      },
      lastMessage: "I'll share the recipe with you soon 🥗",
      timestamp: "2d ago",
      unread: 0,
      chatHistory: [
        {
          id: 1,
          text: "Your recipes are amazing!",
          sender: "me",
          timestamp: "3d ago",
        },
        {
          id: 2,
          text: "Here's my latest creation!",
          sender: "them",
          timestamp: "2d ago",
          media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
          },
        },
      ],
    },
  ];

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));
    setSelectedMedia([...selectedMedia, ...newMedia]);
  };

  const removeMedia = (index) => {
    setSelectedMedia((prev) => {
      const newMedia = [...prev];
      URL.revokeObjectURL(newMedia[index].preview);
      newMedia.splice(index, 1);
      return newMedia;
    });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() && selectedMedia.length === 0) return;

    // Here you would typically upload the media files and send the message
    // For now, we'll just clear the input
    setMessageInput("");
    selectedMedia.forEach((media) => URL.revokeObjectURL(media.preview));
    setSelectedMedia([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AsideNav />

      <main className="flex-1 md:ml-64 md:mr-80 flex">
        {/* Messages List */}
        <div
          className={`w-full md:w-80 border-r border-gray-700 overflow-y-auto ${
            showMobileChat ? "hidden md:block" : "block"
          }`}>
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-40">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => navigate("/profile")}
            />
            <h1 className="text-xl font-bold text-white">Messages</h1>
            <div className="w-8"></div>
          </div>

          <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-white md:block hidden">
              Messages
            </h1>

            <div className="space-y-2">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  onClick={() => {
                    setSelectedChat(message);
                    setShowMobileChat(true);
                  }}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedChat?.id === message.id
                      ? "bg-gray-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
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
                    <div className="w-[70%]">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-white">
                          {message.user.name}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-300 w-[85%] text-sm truncate">
                        {message.lastMessage}
                      </p>
                    </div>
                  </div>
                  {message.unread > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {message.unread}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`${
            showMobileChat ? "block mb-[200px]" : "hidden"
          } md:flex flex-1 flex-col`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden text-white p-2 hover:bg-gray-700 rounded-full">
                    ←
                  </button>
                  <img
                    src={selectedChat.user.avatar}
                    alt={selectedChat.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-white">
                      {selectedChat.user.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {selectedChat.user.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 w-[92%] space-y-4">
                {selectedChat.chatHistory.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[70%] ${
                        msg.sender === "me" ? "bg-blue-600" : "bg-gray-700"
                      } rounded-lg p-3`}>
                      <p className="text-white">{msg.text}</p>
                      {msg.media && (
                        <div className="mt-2 rounded-lg overflow-hidden">
                          {msg.media.type === "image" ? (
                            <img
                              src={msg.media.url}
                              alt="Shared image"
                              className="w-full h-auto rounded-lg"
                            />
                          ) : (
                            <video
                              src={msg.media.url}
                              poster={msg.media.thumbnail}
                              controls
                              className="w-full h-auto rounded-lg"
                            />
                          )}
                        </div>
                      )}
                      <p className="text-xs text-gray-300 mt-1">
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="fixed bottom-16 left-0 right-0 md:relative p-4 border-t border-gray-700 bg-gray-800">
                {selectedMedia.length > 0 && (
                  <div className="flex gap-2 mb-2 overflow-x-auto p-2">
                    {selectedMedia.map((media, index) => (
                      <div key={index} className="relative">
                        {media.type === "image" ? (
                          <img
                            src={media.preview}
                            alt="Upload preview"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <video
                            src={media.preview}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <button
                          onClick={() => removeMedia(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center space-x-4 max-w-[92%] mx-auto">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 text-white rounded-lg p-3 resize-none focus:outline-none"
                    rows="1"
                  />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    id="media-upload"
                    onChange={handleMediaUpload}
                    multiple
                  />
                  <motion.label
                    htmlFor="media-upload"
                    className="p-3 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    📎
                  </motion.label>
                  <motion.button
                    onClick={handleSendMessage}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    Send
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </main>

      <RightSection />
    </div>
  );
};

export default MessagesPage;
