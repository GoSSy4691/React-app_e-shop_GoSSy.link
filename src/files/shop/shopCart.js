let shopCart = [{name: 'itemsCount', value: 0}];

let buffer = new Map();
let countAll = 0

export let addFood = (name) => {
  countAll++;
  buffer.set('itemsCount', countAll);
  if (buffer.get(name) !== undefined) {
    let countItem = buffer.get(name) + 1;
    buffer.set(name, countItem);
  } else {
    buffer.set(name, 1);
  }
  shopCart.length = 0; // ← clean shopcart ↓ and assign new volume
  Array.from(buffer, ([name, value]) => shopCart.push({name, value}));
}

export default shopCart;
