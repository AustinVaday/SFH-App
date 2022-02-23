import Toast from "react-native-toast-message";

import { savesAction } from "../constants";

const initialState = {
  currentUserSaves: [],
  isCurrentUserSavesFetched: false,
};

export const saves = (state = initialState, action) => {
  switch (action.type) {
    case savesAction.FETCH_CURRENT_USER_SAVES_REQUEST:
      return {
        ...state,
      };
    case savesAction.FETCH_CURRENT_USER_SAVES_SUCCESS:
      return {
        ...state,
        currentUserSaves: action.savesFetched,
        isCurrentUserSavesFetched: action.fetched,
      };
    case savesAction.FETCH_CURRENT_USER_SAVES_FAILURE:
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
