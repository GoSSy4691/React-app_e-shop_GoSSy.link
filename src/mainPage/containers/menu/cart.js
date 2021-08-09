import s from './cart.module.css';
import closeButton from '../../../files/img/closeButton.png';
import {NavLink} from 'react-router-dom';

function Cart(props) {
  return (
    <div className={s.darkenBackgroundShow}>
      <div className={s.cartBox}>
        <img
          alt={'closeButtonInCart'}
          onClick={() => props.showCartMenu('close' ,props.renderSiteDom)}
          src={closeButton}
          className={s.closeButton}
          title={'Close'}
        />
        <div className={s.showCart}>
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