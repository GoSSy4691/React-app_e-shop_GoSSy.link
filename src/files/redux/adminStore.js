let adminStore = {
  users: [],
  points: [],
};

export const adminReducer = (state = adminStore, action) => {
  switch (action.type) {
    case "LOAD_ALL_USERS":
      return { ...state, users: action.payload };
    case "LOAD_ALL_POINTS":
      return { ...state, points: action.payload };
    default:
      return state;
  }
};
