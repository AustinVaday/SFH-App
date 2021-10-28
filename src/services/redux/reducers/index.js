import { combineReducers } from "redux";
import { auth } from "./auth.reducers";
import { posts } from "./posts.reducers";

const Reducers = combineReducers({
  auth,
  posts,
});

export default Reducers;
