let buffer = new Map();
let countAll = 0

let cart = {
  inCart: [{name: 'itemsCount', value: 0}],

  addFood(name) {
    countAll++;
    buffer.set('itemsCount', countAll);
    if (buffer.get(name) !== undefined) {
      let countItem = buffer.get(name) + 1;
      buffer.set(name, countItem);
    } else {
      buffer.set(name, 1);
    }
    cart.inCart.length = 0; // ← clean inCart ↓ and assign new volume
    Array.from(buffer, ([name, value]) => cart.inCart.push({name, value}));
  }
}

export default cart