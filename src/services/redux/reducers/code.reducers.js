import Toast from "react-native-toast-message";

import { codeAction } from "../constants";

const initialState = {
  confirmationCode: "",
  timer: 0,
  isTiming: false,
  codeType: "",
};

export const code = (state = initialState, action) => {
  switch (action.type) {
    case codeAction.CONFIRMATION_CODE_REQUEST:
      return {
        ...state,
      };
    case codeAction.CONFIRMATION_CODE_SUCCESS:
      return {
        ...state,
        confirmationCode: action.code,
        codeType: action.codeType,
      };
    case codeAction.CONFIRMATION_CODE_FAILURE:
      const { error } = action;
      Toast.show({
        type: "infoError",
        props: {
          message: error,
        },
        visibilityTime: 2000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    case codeAction.START_TIMER:
      return {
        ...state,
        timer: 60,
        isTiming: true,
      };
    case codeAction.TIMER_TICKING:
      return {
        ...state,
        timer: state.timer - 1,
      };
      case codeAction.STOP_TIMER:
      return {
        ...state,
        isTiming: false,
      };
    default:
      return state;
  }
};
