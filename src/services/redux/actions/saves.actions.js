import { firebase } from "../../../utils/firebase";
import { savesAction } from "../constants";

export const fetchSaves = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("saves")
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
          let saves = snapshot.docs.map((doc) => {
            const saveData = doc.data();

            let post = firebase
              .firestore()
              .collection("posts")
              .doc(saveData.postId)
              .get()
              .then((snapshot) => {
                const id = snapshot.id;
                const postData = snapshot.data();
                return { id, ...postData };
              });

            return post;
          });

          Promise.all(saves)
            .then((savesFetched) => {
              dispatch({
                type: savesAction.FETCH_CURRENT_USER_SAVES_SUCCESS,
                savesFetched,
                fetched: true,
              });
              setLoading(false);
            })
            .catch((error) => {
              dispatch({
                type: savesAction.FETCH_CURRENT_USER_SAVES_FAILURE,
                error,
              });
              setLoading(false);
            });
        });
    } catch (error) {
      dispatch({ type: savesAction.FETCH_CURRENT_USER_SAVES_FAILURE, error });
    }
  });
