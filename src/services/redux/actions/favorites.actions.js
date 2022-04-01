import { firebase } from "../../../utils/firebase";
import { favoritesAction } from "../constants";

export const fetchFavorites = (setLoading) => (dispatch) =>
  new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("favorites")
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
          let favorites = snapshot.docs.map((doc) => {
            const favoriteData = doc.data();

            let word = firebase
              .firestore()
              .collection("words")
              .doc(favoriteData.wordId)
              .get()
              .then((snapshot) => {
                let id = snapshot.id;
                let wordData = snapshot.data();
                return { id, ...wordData };
              });

            return word;
          });

          Promise.all(favorites)
            .then((favoritesFetched) => {
              dispatch({
                type: favoritesAction.FETCH_CURRENT_USER_FAVORITES_SUCCESS,
                favoritesFetched,
                fetched: true,
              });
              setLoading(false);
            })
            .catch((error) => {
              dispatch({
                type: favoritesAction.FETCH_CURRENT_USER_FAVORITES_FAILURE,
                error,
              });
              setLoading(false);
            });
        });
    } catch (error) {
      dispatch({ type: favoritesAction.FETCH_CURRENT_USER_FAVORITES_FAILURE, error });

      setLoading(false);
    }
  });
