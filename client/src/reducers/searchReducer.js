import sortMethods from "../selector/sortMethods";

const initialState = {
  query: {},
  tweets: [],
  isSuccess: false,
  loading: false,
  sort: "date",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_RESULT_DATA":
      return Object.assign({}, state, {
        tweets: action.payload,
        isSuccess: true,
      });
    case "SEARCH_INITIATE":
      return Object.assign({}, initialState, {
        query: action.payload,
        loading: true,
      });
    case "SEARCH_LOADING":
      return Object.assign({}, state, {
        loading: true,
      });
    case "SORT_TWEET":
      return Object.assign({}, state, {
        tweets: state.tweets.sort(sortMethods[action.payload]),
        sort: action.payload,
        loading: true,
      });
    case "HIDE_SPINNER":
      return Object.assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
