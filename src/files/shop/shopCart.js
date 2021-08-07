let shopCart = [[{name: "itemsCount", value: 0}]];

let buffer = new Map();
let countAll = 0

export let addFood = (name) => {
  countAll++
  buffer.set('itemsCount', countAll)
  if (buffer.get(name) !== undefined) {
    let countItem = buffer.get(name) + 1
    buffer.set(name, countItem)
  } else {
    buffer.set(name, 1)
  }
  shopCart.pop()
  shopCart.push(Array.from(buffer, ([name, value]) => ({ name, value })));
}

export default shopCart;
