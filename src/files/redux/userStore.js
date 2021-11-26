import Cookies from "universal-cookie";

const cookies = new Cookies();
let user = {
  userData: false,
  headerStatus: cookies.get("Token") === undefined ? "Log in" : "Loading",
  isLoginShow: false,
  dialogState: "byPhone",
  isUnpaidSomething: false,
  isCartShow: false,
  footerShow: "cart",
  deliveryData: {
    phone: "8(___)___-__-__",
    street: "",
    house: "",
    floor: "",
    apart: "",
    comment: "",
    promocode: "",
  },
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
    case "CART_OPEN_CLOSE":
      return { ...state, isCartShow: !state.isCartShow };
    case "SET_FOOTER_SHOW":
      return { ...state, footerShow: action.payload };
    case "SAVE_DELIVERY_DATA":
      return { ...state, deliveryData: action.payload };
    case "SET_UNPAID_SOMETHING":
      return action.payload !== state.isUnpaidSomething
        ? { ...state, isUnpaidSomething: action.payload }
        : state;
    default:
      return state;
  }
};
