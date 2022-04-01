import { combineReducers } from "redux";
import { user } from "./user.reducers";
import { words } from "./words.reducers";
import { chats } from "./chats.reducers";
import { favorites } from "./favorites.reducers";
import { notifications } from "./notifications.reducers";
import { followers } from "./followers.reducers";
import { followings } from "./followings.reducers";
import { code } from "./code.reducers";
import { comments } from "./comments.reducers";

const Reducers = combineReducers({
  user,
  words,
  chats,
  favorites,
  notifications,
  followers,
  followings,
  code,
  comments
});

export default Reducers;
