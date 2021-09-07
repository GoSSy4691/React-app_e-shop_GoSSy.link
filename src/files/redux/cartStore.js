let cart = {
  isCartShow: false,
  itemsCount: 0,
  selectedFood: [],
};

export const cartReducer = (state = cart, action) => {
  let payload = action.payload;

  const howManyItems = () => {
    let find = state.selectedFood.find((el) => el.name === payload.name);
    return find === undefined ? 0 : find.amount;
  };

  const findIndex = () => {
    return state.selectedFood.findIndex((el) => el.name === payload.name);
  };

  switch (action.type) {
    case "ADD_FOOD":
      if (howManyItems() === 0) {
        state.selectedFood.push({
          name: payload.name,
          costOne: payload.cost,
          amount: 1,
          costAll: payload.cost,
        });
      } else {
        let index = findIndex();
        state.selectedFood[index].amount++;
        state.selectedFood[index].costAll =
          state.selectedFood[index].costAll + state.selectedFood[index].costOne;
      }
      return { ...state, itemsCount: state.itemsCount + 1 };
    case "DELETE_FOOD":
      if (howManyItems() === 1) {
        let index = findIndex();
        state.selectedFood.splice(index, 1);
      } else {
        let index = findIndex();
        state.selectedFood[index].amount--;
        state.selectedFood[index].costAll =
          state.selectedFood[index].costAll - state.selectedFood[index].costOne;
      }
      return { ...state, itemsCount: state.itemsCount - 1 };
    case "OPEN_CART":
      return { ...state, isCartShow: true };
    case "CLOSE_CART":
      return { ...state, isCartShow: false };
    default:
      return state;
  }
};
