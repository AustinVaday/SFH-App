import Toast from "react-native-toast-message";

import { followingsAction } from "../constants";

const initialState = {
  currentUserFollowings: [],
};

export const followings = (state = initialState, action) => {
  switch (action.type) {
    case followingsAction.FETCH_CURRENT_USER_FOLLOWINGS_REQUEST:
      return {
        ...state,
      };
    case followingsAction.FETCH_CURRENT_USER_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        currentUserFollowings: action.followings,
      };
    case followingsAction.FETCH_CURRENT_USER_FOLLOWINGS_FAILURE:
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
