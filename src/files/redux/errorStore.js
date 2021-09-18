let error = {
  message: "",
  type: "none",
};

export const errorReducer = (state = error, action) => {
  switch (action.type) {
    case "ERROR_MESSAGE":
      return { ...state, message: action.payload, type: "red" };
    case "SUCCESS_MESSAGE":
      return { ...state, message: action.payload, type: "green" };
    case "CLEAN_MESSAGE":
      return { ...state, message: "", type: "none" };
    default:
      return state;
  }
};
