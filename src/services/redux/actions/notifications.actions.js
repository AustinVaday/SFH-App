import { Platform } from "react-native";
import Constants from "expo-constants";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
  setNotificationChannelAsync,
  AndroidImportance,
} from "expo-notifications";

import { firebase } from "../../../utils/firebase";
import { notificationsAction } from "../constants";

export const setNotificationService = () => async (dispatch, getState) => {
  console.log("checking token");
  const currentUser = getState().user.currentUser;
  let token;

  if (Constants.isDevice) {
    const existingStatus = await getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus.status !== "granted") {
      const status = await requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus.status === "granted") {
      dispatch({
        type: notificationsAction.NOTIFICATION_SETTING_STATUS,
        status: true,
      });
    }

    token = await getExpoPushTokenAsync();
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (token?.data !== currentUser.notificationToken) {
    console.log("getting token");
    firebase.firestore().collection("users").doc(currentUser.id).update({
      notificationToken: token.data,
    });
  }
};

export const checkNotificationStatus = () => async (dispatch, getState) => {
  const currentStatus = getState().notifications.notificationEnabled;

  const existingStatus = await getPermissionsAsync();

  if (currentStatus === (existingStatus.status === "granted")) {
    console.log("same status");
    return;
  } else {
    console.log("change status");
    dispatch({
      type: notificationsAction.NOTIFICATION_SETTING_STATUS,
      status: !currentStatus,
    });
  }
};

export const fetchNotifications = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("activities")
        .doc(firebase.auth().currentUser.uid)
        .collection("notifications")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          let notifications = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          dispatch({
            type: notificationsAction.FETCH_NOTIFICATIONS_SUCCESS,
            notifications,
            fetched: true,
          });
          setLoading(false);
        });
    } catch (error) {
      dispatch({
        type: notificationsAction.FETCH_NOTIFICATIONS_FAILURE,
        error,
      });
      setLoading(false);
    }
  });
