import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import productReducer from "./productReducer";
export default combineReducers({
  simpleReducer,
  productReducer
});