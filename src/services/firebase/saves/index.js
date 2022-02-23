import Toast from "react-native-toast-message";

import { firebase } from "../../../utils/firebase";

export const saveVideo = (postId, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("saves")
      .add({
        postId,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        Toast.show({
          type: "infoMessage",
          props: {
            message: "Added to Saves",
          },
          visibilityTime: 1500,
          topOffset: 45,
        });

        let saveData = { isSaved: true, saveId: doc.id };

        resolve(saveData);
      })
      .catch((error) => {
        Toast.show({
          type: "infoError",
          props: {
            message: "Unable to save. Try again.",
          },
          visibilityTime: 2500,
          topOffset: 45,
        });

        let saveData = { isSaved: false, saveId: null };

        resolve(saveData);
      });
  });

export const deleteSaveVideo = (saveId, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("saves")
      .doc(saveId)
      .delete()
      .then(() => {
        Toast.show({
          type: "infoMessage",
          props: {
            message: "Removed from Saves",
          },
          visibilityTime: 1500,
          topOffset: 45,
        });

        resolve(false);
      })
      .catch((error) => {
        Toast.show({
          type: "infoError",
          props: {
            message: "Unable to remove from Saves. Try again.",
          },
          visibilityTime: 2500,
          topOffset: 45,
        });

        resolve(true);
      });
  });
