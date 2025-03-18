import { createSlice } from '@reduxjs/toolkit';
import { posts as initialPosts } from '../../assets/UserData';

const initialState = {
  posts: initialPosts,
  likedPosts: [],
  activeComments: null,
  showShareMenu: null
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const postId = action.payload;
      const index = state.likedPosts.indexOf(postId);
      if (index === -1) {
        state.likedPosts.push(postId);
      } else {
        state.likedPosts.splice(index, 1);
      }
    },
    setActiveComments: (state, action) => {
      state.activeComments = action.payload;
    },
    setShowShareMenu: (state, action) => {
      state.showShareMenu = action.payload;
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments += 1;
      }
    },
    sharePost: (state, action) => {
      const { postId } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.shares += 1;
      }
    }
  }
});

export const { toggleLike, setActiveComments, setShowShareMenu, addComment, sharePost } = postSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const selectLikedPosts = (state) => state.posts.likedPosts;
export const selectActiveComments = (state) => state.posts.activeComments;
export const selectShowShareMenu = (state) => state.posts.showShareMenu;

export default postSlice.reducer;