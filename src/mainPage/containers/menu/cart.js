import s from './cart.module.css';
import {NavLink} from 'react-router-dom';

function Cart(props) {
  return (
    <div className={s.darkenBackgroundShow}>
      <div className={s.cartBox}>
        <button className={s.closeButton}
                onClick={() => props.showCartMenu('close' ,props.renderSiteDom)}>
          ✖
        </button>
        <div className={s.showCart}>
          <div className={s.shoppingCartTitle}>Your choose:</div>
          {props.cart.inCart.slice(1).map((currentObject, index) =>
            <li key={Math.random()}>
              {index + 1} ) {currentObject.name} - {currentObject.value} pcs
            </li>
          )}
        </div>
        {(() => {
          if (props.cart.inCart[0].value > 0) {
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