let cart = {
  itemsCount: 0,
  selectedFood: [],
  shopDelivery: [],
  isNeedDelivery: false
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
          delivery: action.delivery,
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
    case "CHANGE_DELIVERY":
      return { ...state, isNeedDelivery: !state.isNeedDelivery };
    default:
      return state;
  }
};
