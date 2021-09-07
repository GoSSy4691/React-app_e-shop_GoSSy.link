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
    case "GET_ALL_MENU":
      let getData = action.payload.data;
      if (typeof getData === "object" && Object.keys(getData).length !== 0) {
        return {
          ...state,
          menuAll: getData[0].menu,
          menuOnDisplay: getData[0].menu,
          categoryAll: state.categoryAll.concat(getData[0].category),
          categoryNow: state.categoryAll[0],
        };
      } else return { ...state, menuOnDisplay: "Ошибка" };
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
