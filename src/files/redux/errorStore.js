let error = {
  message: "",
  type: "none",
  // errorId: 0,
};

export const errorReducer = (state = error, action) => {
  switch (action.type) {
    case "ERROR_MESSAGE":
      return {
        ...state,
        // errorId: state.errorId + 1,
        message: action.payload,
        type: "red",
      };
    case "SUCCESS_MESSAGE":
      return { ...state, message: action.payload, type: "green" };
    default:
      return state;
  }
};
