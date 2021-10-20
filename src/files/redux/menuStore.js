let menu = {
  userView: "Loading",
  points: [],
  shopName: "",
  menuAll: [],
  menuOnDisplay: [],
  category: [],
  categoryNow: 0,
};

let categoryAll = [
  {
    id: 0,
    name: "Все",
    icon: "",
  },
];

export const menuReducer = (state = menu, action) => {
  switch (action.type) {
    case "CHANGE_DISPLAY_NOW":
      return { ...state, userView: action.payload };
    case "LOAD_POINTS":
      return { ...state, points: action.payload };
    case "LOAD_MENU":
      return {
        ...state,
        shopName: action.payload.shopName,
        menuAll: action.payload.menu,
        menuOnDisplay: action.payload.menu,
        category: categoryAll.concat(action.payload.categoryBuffer),
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        categoryNow: action.payload,
        menuOnDisplay:
          action.payload === 0
            ? state.menuAll
            : state.menuAll.filter((el) => el.id_category === action.payload),
      };
    default:
      return state;
  }
};
