let menu = {
  userView: "Loading",
  points: [],
  shopName: "",
  shopId: 0,
  menuAll: [],
  menuOnDisplay: [],
  loadedPages: 0,
  unloadedPages: 0,
  category: [],
  categoryNow: 0,
  isReachedBottom: false,
  howManyLoad: 0,
};

const categoryAll = [
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
        shopId: action.payload.id,
        menuAll: action.payload.menu,
        menuOnDisplay: action.payload.setCategory
          ? action.payload.menu.filter(
              (el) => el.id_category === action.payload.setCategory
            )
          : action.payload.menu,
        category: action.payload.categoryBuffer
          ? categoryAll.concat(action.payload.categoryBuffer)
          : state.category,
        loadedPages: action.payload.loadedPages,
        unloadedPages: action.payload.unloadedPages,
        categoryNow: action.payload.setCategory
          ? action.payload.setCategory
          : state.categoryNow,
        howManyLoad: action.payload.howManyLoad
          ? action.payload.howManyLoad
          : state.howManyLoad,
      };
    case "LOAD_MENU_MORE":
      return {
        ...state,
        menuAll: state.menuAll.concat(action.payload.menu),
        menuOnDisplay:
          state.categoryNow === 0
            ? state.menuAll.concat(action.payload.menu)
            : state.menuAll
                .concat(action.payload.menu)
                .filter((el) => el.id_category === action.payload),
        loadedPages: state.loadedPages + 1,
        unloadedPages: state.unloadedPages - 1,
        isReachedBottom: false,
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
    case "NEAR_TO_BOTTOM":
      if (state.isReachedBottom !== action.payload) {
        return { ...state, isReachedBottom: action.payload };
      } else return state;
    default:
      return state;
  }
};
