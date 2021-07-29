import s from './cart.module.css';
import render from '../../../render';
import closeButton from '../../../files/img/closeButton.png';

let shoppingCart = s.hideCart;
let backGround = s.darkenBackgroundHide;

export function addToCart(name, addFood) {
  addFood(name);
  render();
}

export function showCartMenu() {
  shoppingCart = s.showCart;
  backGround = s.darkenBackgroundShow;
  render();
}

function hideCartMenu() {
  shoppingCart = s.hideCart;
  backGround = s.darkenBackgroundHide;
  render();
}

function Cart(props) {
  return (
    <div className={backGround}>
      <img
        onClick={hideCartMenu}
        src={closeButton}
        className={s.closeButton}
        alt={'closeButtonInToDoList'}
        title={'Close'}
      />
      <div className={shoppingCart}>
        <div className={s.shoppingCartTitle}>Your choose:</div>
        {props.shopCart.map((currElement, index) => <li key={Math.random()}>{index + 1 + ') ' + currElement}</li>)}
      </div>
    </div>
  )
}

export default Cart;