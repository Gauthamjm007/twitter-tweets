import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import searchReducer from "./searchReducer";
import textReducer from "./textReducer";

export default combineReducers({
  errors: errorReducer,
  search: searchReducer,
  text: textReducer,
});
