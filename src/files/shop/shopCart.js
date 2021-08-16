let buffer = new Map();
let countAll = 0;

let cart = {
  //логика добавления или удаления меню должна быть в самом элементе меню
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
    //может быть здесь нужен this?
    cart.inCart.length = 0; // ← clean inCart ↓ and assign new volume
    Array.from(buffer, ([name, value]) => cart.inCart.push({ name, value }));
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
    //может быть здесь нужен this?
    cart.inCart.length = 0; // ← clean inCart ↓ and assign new volume
    //если все равно в массив перегоняем, может отказаться от Map?
    Array.from(buffer, ([name, value]) => cart.inCart.push({ name, value }));
  },
};

export default cart;
