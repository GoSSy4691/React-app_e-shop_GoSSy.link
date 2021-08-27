let cart = new Map();
let data = {
  itemsCount: 0,
  selectedFood: cart,
};

export const cartReducer = (state = data, action) => {
  let name = action.payload;
  switch (action.type) {
    case "ADD_FOOD":
      if (cart.get(name) === undefined) {
        cart.set(name, 1);
      } else {
        cart.set(name, cart.get(name) + 1);
      }
      return { ...state, itemsCount: state.itemsCount + 1 };
    case "DELETE_FOOD":
      if (cart.get(name) === 1) {
        cart.delete(name);
      } else {
        cart.set(name, cart.get(name) - 1);
      }
      return { ...state, itemsCount: state.itemsCount - 1 };
    default:
      return state;
  }
};
