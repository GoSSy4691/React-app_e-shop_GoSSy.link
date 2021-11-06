import Cookies from "universal-cookie";

const cookies = new Cookies();
let user = {
  userData: false,
  headerStatus: cookies.get("Token") === undefined ? "Log in" : "Loading",
  isLoginShow: false,
  dialogState: "byPhone",
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case "PROFILE_DIALOG_SHOW":
      return { ...state, isLoginShow: !state.isLoginShow };
    case "PROFILE_DIALOG_STATE":
      return { ...state, dialogState: action.payload };
    case "LOAD_PROFILE":
      return { ...state, headerStatus: "Loading" };
    case "LOGIN_CONFIRM":
      return { ...state, userData: action.payload, headerStatus: "Profile" };
    case "LOGOUT_CONFIRM":
      cookies.remove("Token");
      return {
        ...state,
        userData: false,
        headerStatus: "Log in",
        dialogState: "byPhone",
      };
    default:
      return state;
  }
};
