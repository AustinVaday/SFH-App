import Toast from "react-native-toast-message";

import { chatsAction } from "../constants";

const initialState = {
  currentUserChats: [],
  otherUsers: [],
};

export const chats = (state = initialState, action) => {
  switch (action.type) {
    case chatsAction.FETCH_CURRENT_USER_CHATS_REQUEST:
      return {
        ...state,
      };
    case chatsAction.FETCH_CURRENT_USER_CHATS_SUCCESS:
      return {
        ...state,
        currentUserChats: action.chats,
      };
    case chatsAction.FETCH_CURRENT_USER_CHATS_FAILURE:
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
    case chatsAction.FETCH_OTHER_USERS_REQUEST:
      return {
        ...state,
      };
    case chatsAction.FETCH_OTHER_USERS_SUCCESS:
      return {
        ...state,
        otherUsers: [...state.otherUsers, action.user],
      };
    case chatsAction.FETCH_OTHER_USERS_FAILURE:
      const { message2 } = action.error;
      Toast.show({
        type: "infoError",
        props: {
          message: message2,
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
