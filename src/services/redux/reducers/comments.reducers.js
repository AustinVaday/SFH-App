import Toast from "react-native-toast-message";

import { commentsAction } from "../constants";

const initialState = {
  comments: [],
  wordId: "",
};

export const comments = (state = initialState, action) => {
  switch (action.type) {
    case commentsAction.FETCH_COMMENTS_REQUEST:
      return {
        ...state,
      };
    case commentsAction.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        wordId: action.wordId,
      };
    case commentsAction.FETCH_COMMENTS_FAILURE:
      const { message } = action.error;
      Toast.show({
        type: "infoError",
        props: {
          message: message,
        },
        visibilityTime: 3000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    case commentsAction.ADD_COMMENT_REQUEST:
      return {
        ...state,
      };
    case commentsAction.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.comment, ...state.comments],
      };
    case commentsAction.ADD_COMMENT_FAILURE:
      const { message2 } = action.error;

      Toast.show({
        type: "infoError",
        props: {
          message: "Unable to add the comment.",
        },
        visibilityTime: 3000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    case commentsAction.DELETE_COMMENT_REQUEST:
      return {
        ...state,
      };
    case commentsAction.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.commentId
        ),
      };
    case commentsAction.DELETE_COMMENT_FAILURE:
      const { message3 } = action.error;

      Toast.show({
        type: "infoError",
        props: {
          message: "Unable to delete the comment. Try again later.",
        },
        visibilityTime: 3000,
        topOffset: 45,
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
