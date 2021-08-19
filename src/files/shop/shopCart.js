let buffer = new Map();
let countAll = 0;

let cart = {
  inCart: [{ name: "itemsCount", value: 0 }],

  addFood(name) {
    countAll++;
    buffer.set("itemsCount", countAll);
    if (buffer.get(name) !== undefined) {
      let countItem = buffer.get(name) + 1;
      buffer.set(name, countItem);
    } else {
      buffer.set(name, 1);
    }
    let output = [];
    Array.from(buffer, ([name, value]) => output.push({ name, value }));
    return output;
  },

  deleteFood(name) {
    countAll--;
    buffer.set("itemsCount", countAll);
    if (buffer.get(name) === 1) {
      buffer.delete(name);
    } else {
      let countItem = buffer.get(name) - 1;
      buffer.set(name, countItem);
    }
    let output = [];
    Array.from(buffer, ([name, value]) => output.push({ name, value }));
    return output;
  },

  changeCart(newCart) {
    this.inCart = newCart; // ← clean inCart ↓ and assign new volume
    // this.inCart.push(newCart);
  },
};

export default cart;
