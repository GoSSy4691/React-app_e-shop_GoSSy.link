import s from './menu.module.css';
import emptyImg from '../../../files/img/noItem.png';
import runForestRun from '../../../files/img/runForestRun.png';
import shopCartIco from '../../../files/img/shopCart.png';
import Cart, {showCartMenu, addToCart} from './cart.js'

function Menu(props) {
  return (
    <div className={s.showRoom}>
      <Cart shopCart={props.shopCart}/>
      <div className={s.topBar}>
        <img src={shopCartIco} className={s.shopIco} alt={'CartImage'} onClick={showCartMenu}/>
        <div className={s.shopIcoCount}>{props.shopCart.length}</div>
      </div>
      <div>
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
      </div>
      <img className={s.footerImg} src={runForestRun} key={Math.random()} alt={'footer'}/>
    </div>);
}

export default Menu;