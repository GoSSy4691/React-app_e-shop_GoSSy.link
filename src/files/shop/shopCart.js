let state = {
  cart: []
}

export let addFood = (name) => {
  state.cart.push(name)
  console.log(state.cart)
}

export default state