import Toast from "react-native-toast-message";

import { followersAction } from "../constants";

const initialState = {
  currentUserFollowers: [],
  isCurrentUserFollowersFetched: false,
};

export const followers = (state = initialState, action) => {
  switch (action.type) {
    case followersAction.FETCH_CURRENT_USER_FOLLOWERS_REQUEST:
      return {
        ...state,
      };
    case followersAction.FETCH_CURRENT_USER_FOLLOWERS_SUCCESS:
      return {
        ...state,
        currentUserFollowers: action.followers,
        isCurrentUserFollowersFetched: action.fetched,
      };
    case followersAction.FETCH_CURRENT_USER_FOLLOWERS_FAILURE:
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
    default:
      return state;
  }
};
