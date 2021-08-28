let menu = {
  menuAll: [],
  menuOnDisplay: "Загрузка",
  categoryAll: [
    {
      id: 0,
      name: "Все",
    },
  ],
  categoryNow: [],
};

export const menuReducer = (state = menu, action) => {
  switch (action.type) {
    case "GET_ALL_MENU":
      let getData = action.payload;
      state.categoryAll = state.categoryAll.concat(getData[0].category);
      state.menuAll = getData[0].menu;
      state.menuOnDisplay = state.menuAll;
      state.categoryNow = state.categoryAll[0];
      return state;
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
