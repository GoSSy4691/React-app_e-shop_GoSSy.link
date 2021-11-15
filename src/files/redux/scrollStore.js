let scroll = {
  isCategoryMoved: false,
};

export const scrollReducer = (state = scroll, action) => {
  switch (action.type) {
    case "MOVE_CATEGORY_DIV":
      return { ...state, isCategoryMoved: action.payload };
    default:
      return state;
  }
};
