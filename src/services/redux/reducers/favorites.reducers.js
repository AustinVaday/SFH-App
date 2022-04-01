import Toast from "react-native-toast-message";

import { favoritesAction } from "../constants";

const initialState = {
  currentUserFavorites: [],
  isCurrentUserFavoritesFetched: false,
};

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case favoritesAction.FETCH_CURRENT_USER_FAVORITES_REQUEST:
      return {
        ...state,
      };
    case favoritesAction.FETCH_CURRENT_USER_FAVORITES_SUCCESS:
      return {
        ...state,
        currentUserFavorites: action.favoritesFetched,
        isCurrentUserFavoritesFetched: action.fetched,
      };
    case favoritesAction.FETCH_CURRENT_USER_FAVORITES_FAILURE:
      const { message } = action.error;
      Toast.show({
        type: "infoError",
        props: {
          message: message,
        },
        visibilityTime: 3000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
