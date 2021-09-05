let errorData = {
  lastError: "",
  isItError: false,
};

export const errorDataReducer = (state = errorData, action) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, lastError: action.payload, isItError: true };
    case "ERROR_CLEAN":
      return { ...state, lastError: "", isItError: false };
    default:
      return state;
  }
};
