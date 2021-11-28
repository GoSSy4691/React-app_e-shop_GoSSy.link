let error = {
  message: "",
  color: "none",
};

export const errorReducer = (state = error, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      return { ...state, message: action.payload, color: action.color };
    default:
      return state;
  }
};
