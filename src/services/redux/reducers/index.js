import { combineReducers } from "redux";
import { user } from "./user.reducers";
import { posts } from "./posts.reducers";
import { chats } from "./chats.reducers";
import { saves } from "./saves.reducers";
import { notifications } from "./notifications.reducers";
import { followers } from "./followers.reducers";
import { followings } from "./followings.reducers";
import { code } from "./code.reducers";

const Reducers = combineReducers({
  user,
  posts,
  chats,
  saves,
  notifications,
  followers,
  followings,
  code,
});

export default Reducers;
