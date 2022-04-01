import { firebase } from "../../../utils/firebase";

import { userAction } from "../constants";

export const userAuthStateListener = () => async (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(fetchCurrentUserData(user.uid));
    } else {
      dispatch({
        type: userAction.FETCH_CURRENT_USER_DATA_SUCCESS,
        data: null,
        loaded: true,
      });
    }
  });
};

export const fetchCurrentUserData = (uid) => (dispatch) => {
  try {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          const id = snapshot.id;

          dispatch({
            type: userAction.FETCH_CURRENT_USER_DATA_SUCCESS,
            data: { id, ...data },
            loaded: true,
          });
        }
      });
  } catch (error) {
    dispatch({
      type: userAction.FETCH_CURRENT_USER_DATA_FAILURE,
      loaded: true,
      error,
    });
  }
};
