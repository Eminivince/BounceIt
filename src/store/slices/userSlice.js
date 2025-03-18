import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Fitness enthusiast | Dance lover | Healthy lifestyle advocate',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=300&fit=crop',
    location: 'New York, USA',
    website: 'www.johndoe.com',
    joinedDate: 'January 2023',
    stats: {
      posts: 156,
      followers: '10.5K',
      following: 234,
      likes: '25.6K'
    }
  },
  users: {
    '@fitnesspro': {
      name: 'Fitness Pro',
      username: '@fitnesspro',
      bio: 'Daily workout routines & fitness tips 💪',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=300&fit=crop',
      location: 'Miami, USA',
      website: 'www.fitnesspro.com',
      joinedDate: 'February 2023'
    },
    '@sarah_dance': {
      name: 'Sarah Dance',
      username: '@sarah_dance',
      bio: 'Professional dancer & choreographer 💃',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=300&fit=crop',
      location: 'Los Angeles, USA',
      website: 'www.sarahdance.com',
      joinedDate: 'March 2023'
    }
  },
  following: [],
  subscriptions: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFollow: (state, action) => {
      const username = action.payload;
      const index = state.following.indexOf(username);
      if (index === -1) {
        state.following.push(username);
      } else {
        state.following.splice(index, 1);
      }
    },
    toggleSubscription: (state, action) => {
      const username = action.payload;
      const index = state.subscriptions.indexOf(username);
      if (index === -1) {
        state.subscriptions.push(username);
      } else {
        state.subscriptions.splice(index, 1);
      }
    },
    updateProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    }
  }
});

export const { toggleFollow, toggleSubscription, updateProfile } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserByUsername = (state, username) => state.user.users[username];
export const selectIsFollowing = (state, username) => state.user.following.includes(username);
export const selectIsSubscribed = (state, username) => state.user.subscriptions.includes(username);

export default userSlice.reducer;