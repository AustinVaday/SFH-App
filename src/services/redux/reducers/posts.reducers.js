import { CURRENT_USER_POSTS_UPDATE, POSTS_TRENDING, USER_FOLLOWING_STATE_CHANGE } from "../constants";

const initialState = {
  currentUserPosts: [],
  trendingPosts: [],
  following: [],
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
      case USER_FOLLOWING_STATE_CHANGE:
        console.log("enter")
        return {
          ...state,
          following: action.following,
        };
    default:
      return state;
  }
};
