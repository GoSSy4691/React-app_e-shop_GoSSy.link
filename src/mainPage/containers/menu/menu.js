import s from './menu.module.css';
import emptyImg from '../../../files/img/noItem.png';
import shopCart from '../../../files/img/shopCart.png';

function ShopCart() {
  return (
    <div className={s.topBar}>
      <img src={shopCart} className={s.shopIco} alt={'shopCart'} onClick={() => console.log("go to shop")}/>
      <div className={s.shopIcoCount}>0</div>
    </div>
  );
}

function Menu(props) {
  return (
    <div className={s.showRoom}>
      <ShopCart/>
      {props.menuItems[0].items.menu.map(p =>
        <div className={s.foodElement} key={p.id}>
          <div className={s.item}>
            <img src={emptyImg} className={s.foodImg} alt={'logo'}/>
            <div className={s.namePrice}>
              <li>{p.name}</li>
              <li>{p.cost}</li>
            </div>
            <div className={s.description}>
              <li>{p.description}</li>
            </div>
          </div>
        </div>)}
    </div>);
}

export default Menu;