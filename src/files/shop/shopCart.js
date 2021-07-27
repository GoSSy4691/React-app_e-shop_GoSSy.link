let state = {
  cart: []
}

export let addFood = (name) => {
  state.cart.push(name)
}

export default state