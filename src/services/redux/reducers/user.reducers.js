import Toast from "react-native-toast-message";

import { userAction } from "../constants";

const initialState = {
  currentUser: null,
  loaded: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case userAction.FETCH_CURRENT_USER_DATA_REQUEST:
      return {
        ...state,
      };
    case userAction.FETCH_CURRENT_USER_DATA_SUCCESS:
      return {
        ...state,
        currentUser: action.data,
        loaded: action.loaded,
      };
    case userAction.FETCH_CURRENT_USER_DATA_FAILURE:
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
        loaded: action.loaded,
      };
    default:
      return state;
  }
};
