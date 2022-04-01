import Toast from "react-native-toast-message";

import { firebase } from "../../../utils/firebase";

export const changeFavoriteState = ({ wordId, isFavorite }) =>
  new Promise((resolve, reject) => {
    if (isFavorite) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("favorites")
        .where("wordId", "==", wordId)
        .get()
        .then((doc) => {
          if (doc.empty) {
            resolve();
          } else {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection("favorites")
              .doc(doc.docs[0].id)
              .delete()
              .then(() => {
                Toast.show({
                  type: "infoMessage",
                  props: {
                    message: "Removed from Favorites",
                  },
                  visibilityTime: 3000,
                  topOffset: 45,
                });

                resolve();
              })
              .catch((error) => {
                Toast.show({
                  type: "infoError",
                  props: {
                    message: "Unable to remove from Favorites. Try again.",
                  },
                  visibilityTime: 3000,
                  topOffset: 45,
                });

                reject();
              });
          }
        });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("favorites")
        .add({
          wordId,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((doc) => {
          Toast.show({
            type: "infoMessage",
            props: {
              message: "Added to Favorites",
            },
            visibilityTime: 3000,
            topOffset: 45,
          });

          resolve();
        })
        .catch((error) => {
          Toast.show({
            type: "infoError",
            props: {
              message: "Unable to favorite. Try again.",
            },
            visibilityTime: 3000,
            topOffset: 45,
          });

          reject();
        });
    }
  });

export const getFavoriteByWordId = (wordId) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("favorites")
      .where("wordId", "==", wordId)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          resolve(false);
        }

        resolve(true);
      })
      .catch(() => reject());
  });
