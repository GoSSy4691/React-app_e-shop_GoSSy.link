let error = {
  lastPopup: "",
  typePopup: "none",
};

export const errorReducer = (state = error, action) => {
  switch (action.type) {
    case "_POPUP_RED":
      return { ...state, lastPopup: action.payload, typePopup: "red" };
    case "_POPUP_GREEN":
      return { ...state, lastPopup: action.payload, typePopup: "green" };
    case "_POPUP_CLEAN":
      return { ...state, lastPopup: "", typePopup: "none" };
    default:
      return state;
  }
};
