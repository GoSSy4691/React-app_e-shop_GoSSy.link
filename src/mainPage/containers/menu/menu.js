import s from './menu.module.css';
import emptyImg from '../../../files/img/noItem.png';
import runForestRun from '../../../files/img/runForestRun.png';
import shopCartIco from '../../../files/img/shopCart.png';
import Cart from './cart.js';

function isFoodInOrder(name, shopCart) {
  return !!shopCart.map(element => element.name).find(element => element === name);
}

function addToCart(name, addFood, render) {
  addFood(name);
  render();
}

let isCartIcoPushed = false;

function showCartMenu(needCloseOrOpen, render) {
  if (needCloseOrOpen === 'close') {isCartIcoPushed = false}
  if (needCloseOrOpen === 'open') {isCartIcoPushed = true}
  render();
}

function CartImgOnTopRight(props) {
  return (
    <div className={s.topBar}>
      <img alt={'CartImage'}
           src={shopCartIco}
           className={s.shopIco}
           onClick={() => showCartMenu('open', props.renderSiteDom)}
      />
      <div className={s.shopIcoCount}>{props.shopCart[0].value}</div>
    </div>
  );
}

function MenuContainers(props) {
  if (props.allMenu.length === 0) return <div>Loading</div>;
  else return (
    <div>
      {props.allMenu.items.menu.map(p =>
        <div className={`${isFoodInOrder(p.name, props.shopCart) ? s.foodElementInOrder : s.foodElement}`}
             key={p.id}>
          <div className={`${isFoodInOrder(p.name, props.shopCart) ? s.itemInOrder : s.item}`}>
            <img
              src={(() => {
                if (p.image === undefined) return emptyImg;
                else return 'https://zloi.space/restaurant/images/' + p.image;
              })()}
              className={s.foodImg}
              alt={'logo'}
            />
            <div className={s.name}>
              <li>{p.name}</li>
            </div>
            <div className={s.sectorOfPriceCountBuy}>
              <div className={s.price}>
                <li>{p.cost + ' ₽'}</li>
              </div>
              {(() => {
                if (isFoodInOrder(p.name, props.shopCart)) {
                  return (
                    <div className={s.showCountOfFood}>{props.shopCart.find(e => e.name === p.name).value}</div>);
                }
              })()}
              <button className={s.buyButton}
                      onClick={() => addToCart(
                        p.name,
                        props.addFood,
                        props.renderSiteDom
                      )}
              >add
              </button>
            </div>
            <div className={s.description}>
              <li>{p.description}</li>
              {(() => {
                if (p.description === undefined) {
                  p.description = 'Пока ещё нет описания. Но это очень вкусно';
                }
              })()}
            </div>
          </div>
        </div>)}
    </div>
  );
}

function Menu(props) {
  return (
    <div className={s.showRoom}>
      {(() => {
        if (isCartIcoPushed === true) {
          return (
            <Cart
              shopCart={props.shopCart}
              renderSiteDom={props.renderSiteDom}
              showCartMenu={showCartMenu}
            />);
        }
      })()}
      <CartImgOnTopRight
        shopCart={props.shopCart}
        renderSiteDom={props.renderSiteDom}
      />
      <MenuContainers
        shopCart={props.shopCart}
        allMenu={props.allMenu}
        addFood={props.addFood}
        renderSiteDom={props.renderSiteDom}
      />
      <img alt={'footer'} className={s.footerImg} src={runForestRun} key={Math.random()}/>
    </div>)
}

export default Menu;