export const setText = (text) => {
  return {
    type: "SET_TEXT",
    payload: text,
  };
};

export const clearText = () => {
  return {
    type: "CLEAR_TEXT",
  };
};

export const getText = () => {
  return {
    type: "GET_TEXT",
  };
};
