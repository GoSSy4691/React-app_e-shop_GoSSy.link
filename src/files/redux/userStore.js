import Cookies from "universal-cookie";
import API from "../API/api";

// const cookies = new Cookies();
let user = {
  // headerStatus: cookies.get("Token") === undefined ? "Log in" : "Loading",
  userData: false,
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case "LOAD_PROFILE":
      return { ...state };
    case "LOGIN_CONFIRM":
      return { ...state, userData: action.payload };
    case "LOGOUT_CONFIRM":
      return { ...state, userData: false };
    default:
      return state;
  }
};
