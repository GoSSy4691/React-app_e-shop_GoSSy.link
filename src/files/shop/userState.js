let userData = {
  isPopupShow: false,
};

export const userDataReducer = (state = userData, action) => {
  switch (action.type) {
    case "OPEN_LOGIN_POPUP":
      return { ...state, isPopupShow: true };
    case "CLOSE_LOGIN_POPUP":
      return { ...state, isPopupShow: false };
    default:
      return state;
  }
};
