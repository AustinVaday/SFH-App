import Toast from "react-native-toast-message";

import { notificationsAction } from "../constants";

const initialState = {
  currentUserNotifications: [],
  isCurrentUserNotificationsFetched: false,
  notificationEnabled: false,
};

export const notifications = (state = initialState, action) => {
  switch (action.type) {
    case notificationsAction.FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
      };
    case notificationsAction.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        currentUserNotifications: action.notifications,
        isCurrentUserNotificationsFetched: action.fetched,
      };
    case notificationsAction.FETCH_NOTIFICATIONS_FAILURE:
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
    case notificationsAction.NOTIFICATION_SETTING_STATUS:
      return {
        ...state,
        notificationEnabled: action.status,
      };
    default:
      return state;
  }
};
