import s from './menu.module.css';
import emptyImg from '../../../files/img/noItem.png';
import shopCart from '../../../files/img/shopCart.png';
import render from '../../../render';

function ShopCart(props) {
  return (
    <div className={s.topBar}>
      <img src={shopCart} className={s.shopIco} alt={'shopCart'} onClick={() => console.log("go to shop")}/>
      <div className={s.shopIcoCount}>{props.shopCart.length}</div>
    </div>
  );
}

function addToCart(name, addFood) {
  addFood(name)
  render()
}

function Menu(props) {
  return (
    <div className={s.showRoom}>
      <ShopCart shopCart={props.shopCart}/>
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