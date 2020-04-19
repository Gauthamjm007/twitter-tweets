import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import errorReducer from "../reducers/errorReducer";
import searchReducer from "../reducers/searchReducer";
import textReducer from "../reducers/textReducer";
const initialState = {};

//initialzing store
const store = createStore(
  combineReducers({
    errors: errorReducer,
    search: searchReducer,
    text: textReducer,
  }),
  initialState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

export default store;
