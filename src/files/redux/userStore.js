let user = {
  isPopupShow: false,
  serverResponse: "",
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_POPUP":
      return { ...state, isPopupShow: true };
    case "CLOSE_LOGIN_POPUP":
      return { ...state, isPopupShow: false };
    case "LOGIN_CONFIRM":
      return { ...state, serverResponse: action.payload };
    default:
      return state;
  }
};
