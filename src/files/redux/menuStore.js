let menu = {
  userView: "Loading",
  points: [],
  shopName: "",
  shopIndex: 0,
  shopId: 0,
  menuOnDisplay: [],
  categoryNow: 0,
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
      return {
        ...state,
        userView: action.payload,
        shopName:
          action.shopName === undefined ? state.shopName : action.shopName,
        shopIndex:
          action.shopIndex === undefined ? state.shopIndex : action.shopIndex,
        shopId: action.shopId === undefined ? state.shopId : action.shopId,
        menuOnDisplay:
          action.menuOnDisplay === undefined
            ? state.menuOnDisplay
            : action.menuOnDisplay,
        categoryNow: 0,
      };
    case "LOAD_POINTS":
      return { ...state, points: action.payload, userView: "Shops" };
    case "LOAD_CATEGORY":
      let shopIndex = action.payload.shopIndex;
      let categoryData = categoryAll.concat(action.payload.categoryData);
      state.points[shopIndex].category = categoryData;
      return { ...state, points: state.points };
    case "LOAD_MENU":
      state.points[action.payload.shopIndex].menu = action.payload.menu;
      console.log(state);
      return {
        ...state,
        shopName: action.payload.shopName,
        shopIndex: action.payload.shopIndex,
        shopId: action.payload.shopId,
        points: state.points,
        menuOnDisplay: action.payload.menu,
        userView: "Menu",
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        categoryNow: action.payload,
        menuOnDisplay:
          action.payload === 0
            ? state.points[state.shopIndex].menu
            : state.points[state.shopIndex].menu.filter(
                (el) => el.id_category === action.payload
              ),
      };
    default:
      return state;
  }
};
