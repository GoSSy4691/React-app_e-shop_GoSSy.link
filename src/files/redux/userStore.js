let user = {
  isUserLogin: false,
  serverResponse: "",
  methodToken: "",
  token: "",
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case "LOGIN_CONFIRM":
      return { ...state, serverResponse: action.payload };
    case "SET_METHOD_TOKEN":
      return { ...state, methodToken: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
