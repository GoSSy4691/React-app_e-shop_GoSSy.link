import s from './menu.module.css';
import emptyImg from '../../../files/img/noItem.png';
import shopCartIco from '../../../files/img/shopCart.png';
import closeButton from '../../../files/img/closeButton.png';
import render from '../../../render';

let shoppingCart = s.hideCart;
let backGround = s.darkenBackgroundHide;

function CartElement(props) {
  return (
    <div className={s.topBar}>
      <img src={shopCartIco} className={s.shopIco} alt={'CartImage'} onClick={showCartMenu}/>
      <div className={s.shopIcoCount}>{props.shopCart.length}</div>
    </div>
  );
}

function addToCart(name, addFood) {
  addFood(name);
  render();
}

function showCartMenu() {
  shoppingCart = s.showCart;
  backGround = s.darkenBackgroundShow;
  render();
}

function hideCartMenu() {
  shoppingCart = s.hideCart;
  backGround = s.darkenBackgroundHide;
  render()
}

function Cart(props) {
  return <div className={backGround}>
    <img
      onClick={hideCartMenu}
      src={closeButton}
      className={s.closeButton}
      alt={'closeButtonInToDoList'}
      title={'Close'}
    />
    <div className={shoppingCart}>
      <div className={s.shoppingCartTitle}>Your chose:</div>
      {props.shopCart.map(p => <li key={Math.random()}>{p}</li>)}
    </div>
  </div>;
}

function Menu(props) {
  return (
    <div className={s.showRoom}>
      <CartElement shopCart={props.shopCart}/>
      <Cart shopCart={props.shopCart}/>
      {props.menuItems[0].items.menu.map(p =>
        <div className={s.foodElement} key={p.id}>
          <div className={s.item}>
            <img src={emptyImg} className={s.foodImg} alt={'logo'}/>
            <div className={s.name}>
              <li>{p.name}</li>
            </div>
            <div className={s.price}>
              <li>{p.cost + ' ₽'}</li>
            </div>
            <button className={s.buyButton} onClick={() => addToCart(p.name, props.addFood)}>add</button>
            <div className={s.description}>
              <li>{p.description}</li>
            </div>
          </div>
        </div>)}
    </div>);
}

export default Menu;