import { USER_STATE_CHANGE, LOADING } from "../constants";

const initialState = {
  currentUser: null,
  loaded: false,
  loading: false,
  googleLoading: false,
  facebookLoading: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
        loaded: action.loaded,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
        googleLoading: action.googleLoading,
        facebookLoading: action.facebookLoading,
      };
    default:
      return state;
  }
};
