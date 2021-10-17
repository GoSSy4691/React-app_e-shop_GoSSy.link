import Cookies from "universal-cookie";

let user = {
  headerStatus: "Log in",
  userData: false,
};

export const userReducer = (state = user, action) => {
  const cookies = new Cookies();
  switch (action.type) {
    case "LOGIN_CONFIRM":
      cookies.set("Token", action.payload, { path: "/" });
      return { ...state, userData: action.payload, headerStatus: "Log out" };
    case "LOGOUT_CONFIRM":
      cookies.remove("Token");
      return { ...state, userData: false, headerStatus: "Log in" };
    case "LOGIN_LOADING":
      return { ...state, headerStatus: "Loading" };
    default:
      return state;
  }
};
