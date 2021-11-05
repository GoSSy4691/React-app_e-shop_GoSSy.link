let settings = {
  isCursorCustom: true,
};

export const settingsReducer = (state = settings, action) => {
  switch (action.type) {
    case "CHANGE_CURSOR":
      return { ...state, isCursorCustom: !state.isCursorCustom };
    default:
      return state;
  }
};
