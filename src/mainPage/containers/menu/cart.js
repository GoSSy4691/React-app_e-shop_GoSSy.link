import s from './cart.module.css';
import closeButton from '../../../files/img/closeButton.png';
import {NavLink} from 'react-router-dom';

let shoppingCart = s.hideCart;
let backGround = s.darkenBackgroundHide;

export function showCartMenu(render) {
  shoppingCart = s.showCart;
  backGround = s.darkenBackgroundShow;
  render();
}

function hideCartMenu(render) {
  shoppingCart = s.hideCart;
  backGround = s.darkenBackgroundHide;
  render();
}

function Cart(props) { //need show only when call
  return (
    <div className={backGround}>
      <div className={s.cartBox}>
        <img
          onClick={() => hideCartMenu(props.renderSiteDom)}
          src={closeButton}
          className={s.closeButton}
          alt={'closeButtonInToDoList'}
          title={'Close'}
        />
        <div className={shoppingCart}>
          <div className={s.shoppingCartTitle}>Your choose:</div>
          {props.shopCart.slice(1).map((currentObject, index) =>
            <li key={Math.random()}>
              {index + 1} ) {currentObject.name} - {currentObject.value} pcs
            </li>
          )}
        </div>
        {(() => {
          if (props.shopCart[0].value > 0) {
            return (<NavLink
              className={s.buttonToOrder}
              exact
              to='/order'
            >Order</NavLink>);
          }
        })()}
      </div>
    </div>
  )
}

export default Cart;