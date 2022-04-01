import { firebase } from "../../../utils/firebase";

import { chatsAction } from "../constants";

export const fetchChats = (setLoading) => (dispatch, getState) => {
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("chats")
        .where("users", "array-contains", firebase.auth().currentUser.uid)
        .orderBy("lastMessageTimestamp", "desc")
        .onSnapshot((snapshot) => {
          let chats = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          for (let i = 0; i < chats.length; i++) {
            console.log("chats loop");
            let otherUserId;
            if (chats[i].users[0] === firebase.auth().currentUser.uid) {
              otherUserId = chats[i].users[1];
            } else {
              otherUserId = chats[i].users[0];
            }

            const found = getState().chats.otherUsers.some(
              (el) => el.id === otherUserId
            );
            if (!found) {
              dispatch(fetchOtherUsers(otherUserId));
            }
          }

          dispatch({
            type: chatsAction.FETCH_CURRENT_USER_CHATS_SUCCESS,
            chats,
          });

          setLoading(false);
        });
    } catch (error) {
      dispatch({ type: chatsAction.FETCH_CURRENT_USER_CHATS_FAILURE, error });
      setLoading(false);
    }
  });
};

export const fetchOtherUsers = (uid) => (dispatch, getState) => {
  new Promise((resolve, reject) => {
    const found = getState().chats.otherUsers.some((el) => el.id === uid);
    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data();
            const id = snapshot.id;

            dispatch({
              type: chatsAction.FETCH_OTHER_USERS_SUCCESS,
              user: { id, ...data },
            });
          }
        })
        .catch((error) => {
          dispatch({ type: chatsAction.FETCH_OTHER_USERS_FAILURE, error });
        });
    }
  });
};
