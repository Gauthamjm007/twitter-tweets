const initialState = "";

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_TEXT":
      return action.payload;
    case "CLEAR_TEXT":
      return "";
    default:
      return state;
  }
}
