import s from './menu.module.css';
import emptyImg from '../../../files/img/noItem.png';
import runForestRun from '../../../files/img/runForestRun.png';
import shopCartIco from '../../../files/img/shopCart.png';
import Cart, {showCartMenu, addToCart} from './cart.js';

function CartImgOnTopRight(props) {
  return (
    <div className={s.topBar}>
      <img alt={'CartImage'}
           src={shopCartIco}
           className={s.shopIco}
           onClick={() => showCartMenu(props.renderSiteDom)}
      />
      <div className={s.shopIcoCount}>{props.shopCart.length}</div>
    </div>
  );
}

function MenuContainers(props) {
  if (props.allMenu.length === 0) return <div>Loading</div>;
  else return (
    <div>
      {props.allMenu.items.menu.map(p =>
        <div className={s.foodElement} key={p.id}>
          <div className={s.item}>
            <img src={getItemImg(p.image)}
                 className={s.foodImg}
                 alt={'logo'}
            />
            <div className={s.name}>
              <li>{p.name}</li>
            </div>
            <div className={s.price}>
              <li>{p.cost + ' ₽'}</li>
            </div>
            <button className={s.buyButton}
                    onClick={() => addToCart(
                      p.name,
                      props.addFood,
                      props.renderSiteDom
                    )}
            >add
            </button>
            <div className={s.description}>
              <li>{p.description}</li>
              {(() => {
                if (p.description === undefined) {
                  p.description = 'Типо пока ещё нет описания. Но это очень вкусно'
                }})()}
            </div>
          </div>
        </div>)}
    </div>
  );
}

function getItemImg(imageName) {
  if (imageName === undefined) return emptyImg;
  else return 'https://zloi.space/restaurant/images/' + imageName;
}

function Menu(props) {
  return (
    <div className={s.showRoom}>
      <Cart
        shopCart={props.shopCart}
        renderSiteDom={props.renderSiteDom}
      />
      <CartImgOnTopRight
        renderSiteDom={props.renderSiteDom}
        shopCart={props.shopCart}
      />
      <MenuContainers
        allMenu={props.allMenu}
        addFood={props.addFood}
        renderSiteDom={props.renderSiteDom}
      />
      <img alt={'footer'} className={s.footerImg} src={runForestRun} key={Math.random()}/>
    </div>);
}

export default Menu;