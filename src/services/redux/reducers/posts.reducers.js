import {
  CURRENT_USER_POSTS_UPDATE,
  POSTS_DISCOVER,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_STATE_CHANGE,
  USER_CHATS_STATE_CHANGE,
  CURRENT_USER_NOTIFICATIONS,
} from "../constants";

const initialState = {
  currentUserPosts: [],
  discoverPosts: [],
  following: [],
  users: [],
  chats: [],
  notifications: [],
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_POSTS_UPDATE:
      return {
        ...state,
        currentUserPosts: action.currentUserPosts,
      };
    case POSTS_DISCOVER:
      return {
        ...state,
        discoverPosts: action.discoverPosts,
      };
    case CURRENT_USER_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };
    case USER_CHATS_STATE_CHANGE: {
      return {
        ...state,
        chats: action.chats,
      };
    }
    case USERS_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    default:
      return state;
  }
};
