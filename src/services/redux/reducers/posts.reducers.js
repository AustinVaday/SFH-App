import Toast from "react-native-toast-message";

import { postsAction } from "../constants";

const initialState = {
  currentUserPosts: [],
  feed: [],
  discoverPosts: [],
  isCurrentUserPostsFetched: false,
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case postsAction.FETCH_FEED_REQUEST:
      return {
        ...state,
      };
    case postsAction.FETCH_FEED_SUCCESS:
      return {
        ...state,
        feed: action.posts,
      };
    case postsAction.FETCH_FEED_FAILURE:
      const { message } = action.error;
      Toast.show({
        type: "infoError",
        props: {
          message: message,
        },
        visibilityTime: 2000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    case postsAction.FETCH_CURRENT_USER_POSTS_REQUEST:
      return {
        ...state,
      };
    case postsAction.FETCH_CURRENT_USER_POSTS_SUCCESS:
      return {
        ...state,
        currentUserPosts: action.posts,
        isCurrentUserPostsFetched: action.fetched,
      };
    case postsAction.FETCH_CURRENT_USER_POSTS_FAILURE:
      const { message2 } = action.error;
      Toast.show({
        type: "infoError",
        props: {
          message: message2,
        },
        visibilityTime: 2000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    case postsAction.FETCH_DISCOVER_POSTS_REQUEST:
      return {
        ...state,
      };
    case postsAction.FETCH_DISCOVER_POSTS_SUCCESS:
      return {
        ...state,
        discoverPosts: action.posts,
      };
    case postsAction.FETCH_DISCOVER_POSTS_FAILURE:
      const { message3 } = action.error;
      Toast.show({
        type: "infoError",
        props: {
          message: message3,
        },
        visibilityTime: 2000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
