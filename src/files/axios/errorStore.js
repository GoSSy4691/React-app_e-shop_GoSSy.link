let errorData = {
  lastPopup: "",
  typePopup: "none",
};

export const errorDataReducer = (state = errorData, action) => {
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
