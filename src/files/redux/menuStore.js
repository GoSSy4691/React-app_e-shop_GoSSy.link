let menu = {
  menuAll: [],
  menuOnDisplay: "Загрузка",
  categoryAll: [
    {
      id: 0,
      name: "Все",
      icon: "",
    },
  ],
  categoryNow: [],
};

export const menuReducer = (state = menu, action) => {
  switch (action.type) {
    case "ALL_MENU":
      let shops = action.payload;
      return {
        ...state,
        menuAll: shops[0].menu,
        menuOnDisplay: shops[0].menu,
        categoryAll: state.categoryAll.concat(shops[0].category),
        categoryNow: state.categoryAll[0],
      };
    case "CHANGE_CATEGORY":
      state.categoryNow = state.categoryAll.find(
        (e) => e.id === action.payload
      );
      if (state.categoryNow.id === 0) {
        state.menuOnDisplay = state.menuAll;
      } else {
        state.menuOnDisplay = state.menuAll.filter(
          (e) => e.id_category === state.categoryNow.id
        );
        if (state.menuOnDisplay.length === 0) {
          state.menuOnDisplay = "Пусто";
        }
      }
      return state;
    default:
      return state;
  }
};
