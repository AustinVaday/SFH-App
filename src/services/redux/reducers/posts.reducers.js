import { CURRENT_USER_POSTS_UPDATE, POSTS_TRENDING } from "../constants";

const initialState = {
  currentUserPosts: null,
  trendingPosts: null,
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_POSTS_UPDATE:
      return {
        ...state,
        currentUserPosts: action.currentUserPosts,
      };
    case POSTS_TRENDING:
      return {
        ...state,
        trendingPosts: action.trendingPosts,
      };
    default:
      return state;
  }
};
