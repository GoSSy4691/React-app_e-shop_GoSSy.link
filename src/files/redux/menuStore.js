let menu = {
  status: "Empty",
  data: [],
  shopId: 0,
  shops: [],
  menuOnDisplay: [],
  category: [],
};

let category0 = [
  {
    id: 0,
    name: "Все",
    icon: "",
  },
];

export const menuReducer = (state = menu, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      if (action.payload.__proto__.constructor.name !== "Array") {
        return { ...state, status: "Data isn't a Array" };
      } else {
        return {
          ...state,
          status: "Choose shop",
          data: action.payload,
          shops: action.payload,
        };
      }
    case "CHANGE_SHOP":
      let point = state.data;
      let pointNumber = action.payload;
      return {
        ...state,
        status: "Choose food",
        category: category0.concat(point[pointNumber].category),
        shopId: pointNumber,
        menuOnDisplay: point[pointNumber].menu,
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        menuOnDisplay:
          action.payload === 0
            ? state.data[state.shopId].menu
            : state.data[state.shopId].menu.filter(
                (el) => el.id_category === action.payload
              ),
      };
    case "CHANGE_STATUS":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
