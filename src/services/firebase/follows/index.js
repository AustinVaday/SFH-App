import Toast from "react-native-toast-message";

import { firebase } from "../../../utils/firebase";
import {
  sendNotification,
  deleteFollowingNotification,
} from "../notifications";

export const followUser = (user, currentUser) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("follows")
      .doc(currentUser.id)
      .collection("userFollowings")
      .doc(user.id)
      .set({
        username: user.username,
        profilePhoto: user.profilePhoto,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        firebase
          .firestore()
          .collection("follows")
          .doc(user.id)
          .collection("userFollowers")
          .doc(currentUser.id)
          .set({
            username: currentUser.username,
            profilePhoto: currentUser.profilePhoto,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
          });

        sendNotification(
          user,
          "Signs of Humanity",
          `${currentUser.username}` + " followed you.",
          {
            type: "follow",
            user: currentUser,
          }
        );
      })
      .catch(() => {
        Toast.show({
          type: "infoError",
          props: {
            message: "Unable to follow this user. Try again later.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  });

export const unfollowUser = (user, currentUser) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("follows")
      .doc(currentUser.id)
      .collection("userFollowings")
      .doc(user.id)
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection("follows")
          .doc(user.id)
          .collection("userFollowers")
          .doc(currentUser.id)
          .delete();

        deleteFollowingNotification(user.id, currentUser.id);
      })
      .catch(() => {
        Toast.show({
          type: "infoError",
          props: {
            message: "Unable to unfollow this user. Try again later.",
          },
          visibilityTime: 3000,
          topOffset: 45,
        });
      });
  });
