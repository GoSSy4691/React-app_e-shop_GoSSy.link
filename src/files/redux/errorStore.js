let error = {
  lastPopup: "",
  typePopup: "none",
};

export const errorReducer = (state = error, action) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, lastPopup: action.payload, typePopup: "red" };
    case "POPUP":
      return { ...state, lastPopup: action.payload, typePopup: "green" };
    case "POPUP_CLEAN":
      return { ...state, lastPopup: "", typePopup: "none" };
    default:
      return state;
  }
};
