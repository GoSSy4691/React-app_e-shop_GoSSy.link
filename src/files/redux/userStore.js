import Cookies from "universal-cookie";

let user = {
  isUserLogin: false,
  token: "",
};

export const userReducer = (state = user, action) => {
  const cookies = new Cookies();
  switch (action.type) {
    case "LOGIN_CONFIRM":
      cookies.set("Token", action.payload, { path: "/" });
      return { ...state, isUserLogin: true, token: action.payload };
    case "LOGOUT_CONFIRM":
      cookies.remove("Token");
      return { ...state, isUserLogin: false, token: "" };
    default:
      return state;
  }
};
