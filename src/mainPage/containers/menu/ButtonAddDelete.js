const changeCart = {
  add(props) {
    let newCart = props.cart.addFood(props.name);
    props.setCartRender(newCart);
    props.cart.changeCart(newCart);
    props.setCountAll(props.cart.inCart[0].value);
  },

  delete(props) {
    let newCart = props.cart.deleteFood(props.name);
    props.setCartRender(newCart);
    props.cart.changeCart(newCart);
    props.setCountAll(props.cart.inCart[0].value);
  },
};

export function ButtonAdd(props) {
  return (
    <button className={props.style} onClick={() => changeCart.add(props)}>
      add
    </button>
  );
}

export function ButtonDelete(props) {
  return (
    <button className={props.style} onClick={() => changeCart.delete(props)}>
      -
    </button>
  );
}
