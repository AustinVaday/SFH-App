import { combineReducers } from "redux"
import { auth } from "./auth.reducers";

const Reducers = combineReducers({
    auth
})

export default Reducers;