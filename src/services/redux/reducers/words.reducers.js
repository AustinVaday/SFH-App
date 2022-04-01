import Toast from "react-native-toast-message";

import { wordsAction } from "../constants";

const initialState = {
  currentUserWords: [],
  feed: [],
  discoverWords: [],
  isCurrentUserWordsFetched: false,
};

export const words = (state = initialState, action) => {
  switch (action.type) {
    case wordsAction.FETCH_FEED_REQUEST:
      return {
        ...state,
      };
    case wordsAction.FETCH_FEED_SUCCESS:
      return {
        ...state,
        feed: action.words,
      };
    case wordsAction.FETCH_FEED_FAILURE:
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
    case wordsAction.FETCH_CURRENT_USER_WORDS_REQUEST:
      return {
        ...state,
      };
    case wordsAction.FETCH_CURRENT_USER_WORDS_SUCCESS:
      return {
        ...state,
        currentUserWords: action.words,
        isCurrentUserWordsFetched: action.fetched,
      };
    case wordsAction.FETCH_CURRENT_USER_WORDS_FAILURE:
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
    case wordsAction.FETCH_DISCOVER_WORDS_REQUEST:
      return {
        ...state,
      };
    case wordsAction.FETCH_DISCOVER_WORDS_SUCCESS:
      return {
        ...state,
        discoverWords: action.words,
      };
    case wordsAction.FETCH_DISCOVER_WORDS_FAILURE:
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
